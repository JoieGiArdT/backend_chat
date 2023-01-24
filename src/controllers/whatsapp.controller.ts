import { Request, Response } from 'express'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { conversationService, SchemaConversation } from '../services/conversation.service'
import { messageService, SchemaMessage } from '../services/message.service'

export default class WhatsappController {
  verifyToken ({ query }: Request, res: Response): void {
    try {
      const accessToken = String(process.env.TOKENA)
      if (query['hub.challenge'] != null &&
    String(query['hub.verify_token']) != null &&
    String(query['hub.verify_token']) === accessToken) {
        res.send(query['hub.challenge'])
      } else {
        res.status(400).send('VERIFICATION_FAILED')
      }
    } catch (error) {
      res.status(400).send()
    }
  }

  receivedMessageWhatsapp ({ body }: Request, res: Response): void {
    try {
      const _body = body.entry[0].changes[0].value
      const id = _body.contacts[0].wa_id
      conversationService.getConversationById(id).then((responseGetConversationById) => {
        new Promise((resolve, reject) => {
          if (responseGetConversationById[0] != null) {
            resolve(responseGetConversationById[0].id)
          } else {
            (async (): Promise<DocumentReference<DocumentData>> => {
              return await conversationService.createConversation(
                new SchemaConversation(
                  id,
                  _body.contacts[0].profile.name,
                  _body.messages[0].from,
                  _body.messages[0].id
                ).conversation)
            })().then((responseCreateConversation) => resolve(responseCreateConversation.id))
              .catch((error) => reject(error))
          }
        }).then((idConversation) => {
          const schemaMessage = new SchemaMessage(
            _body.messages[0].id,
            _body.messages[0].from,
            _body.messages[0].type,
            _body.messages[0][_body.messages[0].type]
          )
          messageService.createMessage(
            schemaMessage.message,
            idConversation
          ).then(() => {
            res.send('EVENT_RECEIVED')
          }).catch((error) => {
            throw new Error('ERROR: CREACION DEL MENSAJE - ' + String(error))
          })
        }).catch((error) => {
          throw new Error('ERROR: EXTRACCION DE ID - ' + String(error))
        })
      }).catch((error) => {
        throw new Error('ERROR: REVISION DE CONVERSACION EXISTENTE - ' + String(error))
      })
    } catch (error) {
      res.status(400).send('NOT_RECEIVED')
    }
  }
}

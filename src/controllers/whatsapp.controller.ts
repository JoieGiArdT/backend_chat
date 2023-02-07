import { Request, Response } from 'express'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { conversationService, SchemaConversation } from '../services/conversation.service'
import { messageService, SchemaMessage } from '../services/message.service'
import { taskService, SchemaTask } from '../services/task.service'
import whatsappService from '../services/whatsapp.service'
import { botUtil } from '../utils/bot.util'

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
      body = body.entry[0].changes[0].value
      taskService.getTaskById(body.contacts[0].wa_id)
        .then((responseGetTaskById) => {
          const responseGetParameterForAnswerTask = botUtil.getParameterForAnswerTask({
            answer: (responseGetTaskById[0] === undefined
              ? 1
              : (responseGetTaskById[0].data().sequence_task).length as number + 1
            ),
            response: body.messages[0]
          },
          (body.messages[0].type === 'text'
            ? body.messages[0][body.messages[0].type].body
            : (responseGetTaskById[0] === undefined
                ? 'No task'
                : responseGetTaskById[0].data().type_task
              )))
          if (Object.entries(responseGetParameterForAnswerTask).length === 0) {
            res.send('ES UNA CONVERSACION')
          } else if (responseGetTaskById[0] === undefined) {
            void taskService.createTask(
              new SchemaTask(
                body.contacts[0].wa_id,
                body.messages[0][body.messages[0].type].body,
                [body.messages[0][body.messages[0].type].body]
              ).task)
          } else {
            void taskService.updateTask(body.contacts[0].wa_id,
              (responseGetTaskById[0].data().sequence_task).push('Nuevo'))
          }
          whatsappService.sendMessageWhatsapp(
            responseGetParameterForAnswerTask.parameters,
            responseGetParameterForAnswerTask.type,
            '113492004941110',
            'EAAFlbvoSH6YBANiz7c9R0mBCzt8nIvcpy1KVqTXtUyAARy3Wd7SH2oLMsZASKP8K0JB8nkZCXqJEOtBf7PKxFRRdbFW7X08zS7mSzlPEXsWEuaDfMw4jFUOAtWiBKXeXdT8hJR5JMeXyXZAVZC140ZB4Jmsgmv8oNTdSQ3x8LFZAQ55qpCzkAVIBNxE6EbDOjI1Ska5ZClrXQZDZD',
            body.messages[0].from)
            .then(() => {
              res.send('EVENT_RECEIVED')
            }).catch((error) => {
              throw new Error('ERROR: ENVIANDO RESPUESTA - ' + String(error))
            })
        }).catch((error) => {
          throw new Error('ERROR: REVISION DE TASK PENDIENTES - ' + String(error))
        })
    } catch (error) {
      res.status(400).send('NOT_RECEIVED')
    }
  }

  requestTypeTask ({ body }: Request): void {
    console.log(body)
  }

  requestTypeConversation ({ body }: Request, res: Response): void {
    const id = body.contacts[0].wa_id
    conversationService.getConversationById(id).then((responseGetConversationById) => {
      new Promise((resolve, reject) => {
        if (responseGetConversationById[0] != null) {
          resolve(responseGetConversationById[0].id)
        } else {
          (async (): Promise<DocumentReference<DocumentData>> => {
            return await conversationService.createConversation(
              new SchemaConversation(
                id,
                body.contacts[0].profile.name,
                body.messages[0].from,
                body.messages[0].id
              ).conversation)
          })().then((responseCreateConversation) => resolve(responseCreateConversation.id))
            .catch((error) => reject(error))
        }
      }).then((idConversation) => {
        const schemaMessage = new SchemaMessage(
          body.messages[0].id,
          body.messages[0].from,
          body.messages[0].type,
          body.messages[0][body.messages[0].type]
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
  }
}

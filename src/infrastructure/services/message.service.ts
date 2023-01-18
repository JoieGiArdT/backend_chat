/* eslint-disable @typescript-eslint/no-floating-promises */
import { Message } from '../types/message.types'
import ConversationService from '../services/conversation.service'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp
} from 'firebase/firestore'
import FireStore from '../config/firebase.database'
import whatsappService from './whatsapp.service'

class MessageService {
  /**
 * Enviar mensaje desde el area de chat,
 * se tomara el id del chat en pantalla
 * para relacionarlo con la conversacion.
 */
  async saveAndSentMessage (message: Message, id: String): Promise<void> {
    await addDoc(collection(FireStore.dataBase, 'messages'), Object.defineProperties(message, {
      timestamp: {
        value: Timestamp.now
      },
      conversation_id: {
        value: id
      }
    }
    ))
  }

  /**
 * Enviar mensaje fuera del chat, se
 * utiliza para iniciar conversaciones.
 */
  async saveAndSentMessageAndCreateConversation (message: any, _to: string): Promise<void> {
    let cb
    switch (message.type) {
      case 'text': {
        cb = whatsappService.sendText
        break
      }
      case 'image':
      case 'document':
      case 'audio':
      case 'video':
      case 'sticker':
      case 'location':
      case 'contacts':
        break
      case 'interactive':
        break

      default:{
        cb = (): string => {
          return 'jeje'
        }
        break
      }
    }
    await whatsappService.sendMessageWhatsapp({
      to: _to,
      text: message.body,
      options: message.preview_url
    },
    cb,
    process.env.ID_NUMBER as string,
    process.env.WP_TOKEN as string
    ).then((resolve) => {
      ConversationService.createConversation({
        external_id: resolve.whatsappId,
        tarjet_information: {
          display_name: 'Giovanni',
          to: _to
        },
        last_message_id: resolve.messageId,
        last_update: 'Prueba',
        status: 'CERRADO',
        atention_type: 'ADVISER'
      }).then(() => {
        addDoc(collection(FireStore.dataBase, 'messages'), Object.defineProperty(message, 'timestamp', {
          value: Timestamp.now
        }))
      })
    })
  }

  /**
 * Guardar mensajes recibidos por el
 * webhook de Whatsapp.
 */
  /* async saveMessageAndvalidateConversation (message: Message): Promise<void> {
    // recibidos de whatsapp
  } */
  async getMessagesByConversationId (id: string): Promise<object[]> {
    const _query = query(collection(FireStore.dataBase, 'messages'), where('conversation_id', '==', id))
    const querySnapshot = await getDocs(_query)
    const resultMessages: object[] = []
    querySnapshot.forEach((doc) => {
      resultMessages.push(doc.data())
    })
    return resultMessages
  }
}
export default new MessageService()

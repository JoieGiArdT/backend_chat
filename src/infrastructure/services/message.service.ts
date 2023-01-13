import { Message } from '../interface/message.interface'
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
  async saveAndSentMessageAndCreateConversation (message: Message): Promise<void> {
    await ConversationService.createConversation()
    await addDoc(collection(FireStore.dataBase, 'messages'), Object.defineProperty(message, 'timestamp', {
      value: Timestamp.now
    }))
  }

  /**
 * Guardar mensajes recibidos por el
 * webhook de Whatsapp.
 */
  async saveMessageAndvalidateConversation (message: Message): Promise<void> {
    // recibidos de whatsapp
  }

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

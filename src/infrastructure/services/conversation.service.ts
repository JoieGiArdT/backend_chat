import { Conversation } from '../interface/conversation.interface'
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
  async SaveConversation (conversation: Conversation) Promise<void> {
    await addDoc(collection(FireStore.dataBase, 'messages'), Object.defineProperty(message, 'timestamp', {
      value: Timestamp.fromDate(new Date())
    }))
  }

  async getMessagesById (id: string): Promise<object[]> {
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

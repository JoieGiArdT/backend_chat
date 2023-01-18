import { Conversation } from '../types/conversation.types'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp,
  DocumentReference
} from 'firebase/firestore'
import FireStore from '../config/firebase.database'

class ConversationService {
  async createConversation (conversation: Conversation): Promise<DocumentReference> {
    return await addDoc(collection(FireStore.dataBase, 'messages'), Object.defineProperty(conversation, 'last_update', {
      value: Timestamp.now
    }))
  }

  async getConversationByUserId (id: string): Promise<object[]> {
    const _query = query(collection(FireStore.dataBase, 'conversations'), where('external_id', '==', id))
    const querySnapshot = await getDocs(_query)
    const resultConversations: object[] = []
    querySnapshot.forEach((doc) => {
      resultConversations.push(doc.data())
    })
    return resultConversations
  }
}

export default new ConversationService()

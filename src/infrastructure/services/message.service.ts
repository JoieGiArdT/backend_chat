import { Message } from '../interface/message.interface'
import { Document } from 'mongoose'
import MessageModel from '../models/message.model'
// import { Request } from 'express'

class MessageService {
  async SaveMessage (message: Message): Promise<Document> {
    const responseSaveMessage = await MessageModel.create(message)
    return responseSaveMessage
  }

  async getMessages (): Promise<Document[]> {
    const responseGetMessage = await MessageModel.find({})
    return responseGetMessage
  }
}
export default new MessageService()

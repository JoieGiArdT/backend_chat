import { Message } from '../interface/message.interface'
import { Schema, model } from 'mongoose'

const MessageSchema: Schema<Message> = new Schema<Message>(
  {
    conversation_id: {
      required: true,
      type: String
    },
    from: {
      required: true,
      type: String
    },
    type: {
      required: true,
      type: String
    },
    content_message: {
      required: true,
      type: Object
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('messages', MessageSchema)

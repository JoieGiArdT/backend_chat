import { Message } from '../interface/message.interface'
// import { Request } from 'express'

class WhatsappService {
  verifyToken (receivedToken: string, challenge: any): string {
    const accessToken = String(process.env.TOKENA)
    return (challenge != null && receivedToken != null && receivedToken === accessToken) ? challenge : 'VERIFICATION_FAILED'
  }

  receivedMessageWhatsapp (body: any): Message {
    return {
      exterals_id: {
        wa_id: body.id
      },
      conversation_id: '123',
      from: body.from,
      type: body.type,
      content_message: {
        value: true,
        text: {
          preview_url: false,
          body: body.text.body
        }
      }
    }
  }
}
export default new WhatsappService()

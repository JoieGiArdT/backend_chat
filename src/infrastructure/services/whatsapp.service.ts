import { Message } from '../interface/message.interface'
// import { Request } from 'express'

class WhatsappService {
  verifyToken (receivedToken: string, challenge: any): string {
    const accessToken = String(process.env.TOKENA)
    return (challenge != null && receivedToken != null && receivedToken === accessToken) ? challenge : 'VERIFICATION_FAILED'
  }

  receivedMessageWhatsapp (body: any): Message {
    return {
      externals_id: {
        wa_id: body.messages[0].id
      },
      timestamp: parseInt(body.Timestamp),
      conversation_id: body.contacts[0].wa_id,
      from: body.messages[0].from,
      type: body.messages[0].type,
      content_message: {
        value: true,
        text: {
          preview_url: false,
          body: body.messages[0].text.body
        }
      }
    }
  }
}
export default new WhatsappService()

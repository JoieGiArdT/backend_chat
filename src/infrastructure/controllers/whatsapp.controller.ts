import { Request, Response, NextFunction } from 'express'
import MessageService from '../services/message.service'
import WhatsappService from '../services/whatsapp.service'

export default class WhatsappController {
  verifyToken ({ query }: Request, res: Response, _next: NextFunction): void {
    try {
      const verificationStatus = WhatsappService.verifyToken(
        String(query['hub.verify_token']),
        query['hub.challenge'])
      if (verificationStatus !== 'VERIFICATION_FAILED') {
        res.send(verificationStatus)
      } else {
        res.status(400).send(verificationStatus)
      }
    } catch (error) {
      res.status(400).send()
    }
  }

  receivedMessageWhatsapp ({ body }: Request, res: Response, _next: NextFunction): void {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = MessageService.SaveMessage(WhatsappService.receivedMessageWhatsapp(body))
      MessageService.getMessages().then((value) => {
        res.json(value)
      }).catch((e) => console.error(e))
    } catch (e) {
      res.send('EVENT_RECEIVED')
    }
  }
}

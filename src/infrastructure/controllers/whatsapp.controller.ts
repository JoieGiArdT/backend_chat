import { Request, Response, NextFunction } from 'express'
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
      body = WhatsappService.receivedMessageWhatsapp(body)
      res.send('EVENT_RECEIVED')
    } catch (e) {
      res.send('EVENT_RECEIVED')
    }
  }
}

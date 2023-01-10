import { Request, Response, NextFunction } from 'express'
import whatsappService from '../services/whatsapp.service'

export default class WhatsappController {
  VerifyToken ({ query }: Request, res: Response, _next: NextFunction): void {
    try {
      const verificationStatus = whatsappService.verifyToken(
        String(query['hub.verify_token']),
        String(query['hub.challenge']))
      if (verificationStatus !== 'VERIFICATION_FAILED') {
        res.send(verificationStatus)
      } else {
        res.status(400).send(verificationStatus)
      }
    } catch (error) {
      res.status(400).send()
    }
  }

  ReceivedMessage (req: Request, res: Response, _next: NextFunction): void {
    try {
      const messages = req.body[0]
      const number = messages.from
      // var text = GetTextUser(messages);
      /* if (text != "") {
        SendMessage("Hola", number);
        // dialogflow.sendToDialogFlow("Hola","123123", number);
      } */
      res.send(number)
    } catch (e) {
      res.send('EVENT_RECEIVED')
    }
  }
}

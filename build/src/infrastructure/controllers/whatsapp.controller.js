'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const message_service_1 = __importDefault(require('../services/message.service'))
const whatsapp_service_1 = __importDefault(require('../services/whatsapp.service'))
class WhatsappController {
  verifyToken ({ query }, res, _next) {
    try {
      const verificationStatus = whatsapp_service_1.default.verifyToken(String(query['hub.verify_token']), query['hub.challenge'])
      if (verificationStatus !== 'VERIFICATION_FAILED') {
        res.send(verificationStatus)
      } else {
        res.status(400).send(verificationStatus)
      }
    } catch (error) {
      res.status(400).send()
    }
  }

  receivedMessageWhatsapp ({ body }, res, _next) {
    try {
      message_service_1.default.SaveMessage(whatsapp_service_1.default.receivedMessageWhatsapp(body)).then(() => console.log('Recibido')).catch(() => console.log('No recibido'))
      // MessageService.getMessages().then(() => console.log('Tomados')).catch(() => console.log('No tomados'))
      res.send('EVENT_RECEIVED')
    } catch (e) {
      res.send('EVENT_RECEIVEDD')
    }
  }
}
exports.default = WhatsappController

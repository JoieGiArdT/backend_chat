'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
class WhatsappController {
  VerifyToken (req, res, _next) {
    try {
      const accessToken = 'FDSG7G98FG76F6G7GFD78H6F6F'
      const token = req.query['hub.verify_token']
      const challenge = req.query['hub.challenge']
      if (challenge != null && token != null && token === accessToken) {
        res.send(challenge)
      } else {
        res.status(400).send()
      }
    } catch (error) {
      res.status(400).send()
    }
  }

  ReceivedMessage (req, res, _next) {
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
exports.default = WhatsappController

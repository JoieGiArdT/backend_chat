import { Request, Response, NextFunction } from "express";

export default class WhatsappController {
  constructor() {}
  VerifyToken(req: Request, res: Response, _next: NextFunction) {
    try {
      var accessToken = "FDSG7G98FG76F6G7GFD78H6F6F";
      var token = req.query["hub.verify_token"];
      var challenge = req.query["hub.challenge"];

      if (challenge != null && token != null && token == accessToken) {
        res.send(challenge);
      } else {
        res.status(400).send();
      }
    } catch (error) {
      res.status(400).send();
    }
  }
  ReceivedMessage(req: Request, res: Response, _next: NextFunction) {
    try {
      var messages = req.body[0];
      var number = messages["from"];
      // var text = GetTextUser(messages);
      /* if (text != "") {
        SendMessage("Hola", number);
        // dialogflow.sendToDialogFlow("Hola","123123", number);
      } */ 
      res.send(number);
    } catch (e) {
      res.send("EVENT_RECEIVED");
    }
  }
}

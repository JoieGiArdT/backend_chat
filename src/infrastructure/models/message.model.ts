import { Message } from "../interface/message.interface";
import { Schema, Types, model, Model } from "mongoose";
import { Request, Response } from "express";
export class MessageSchema extends Schema{
  message: Schema<Message> = new Schema<Message>({
    message_id: {
      required: true,
      type: String,
    },
    from: {
      required: true,
      type: String,
    },
    timestamp: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
  });
}
// la idea es que los servicios reciban un tipo de datos como este y desde el model tenga acceso a todo
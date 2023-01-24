"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_service_1 = require("../services/conversation.service");
const message_service_1 = require("../services/message.service");
class WhatsappController {
    verifyToken({ query }, res) {
        try {
            const accessToken = String(process.env.TOKENA);
            if (query['hub.challenge'] != null &&
                String(query['hub.verify_token']) != null &&
                String(query['hub.verify_token']) === accessToken) {
                res.send(query['hub.challenge']);
            }
            else {
                res.status(400).send('VERIFICATION_FAILED');
            }
        }
        catch (error) {
            res.status(400).send();
        }
    }
    receivedMessageWhatsapp({ body }, res) {
        try {
            const _body = body.entry[0].changes[0].value;
            const id = _body.contacts[0].wa_id;
            conversation_service_1.conversationService.getConversationById(id).then((responseGetConversationById) => {
                new Promise((resolve, reject) => {
                    if (responseGetConversationById[0] != null) {
                        resolve(responseGetConversationById[0].id);
                    }
                    else {
                        (() => __awaiter(this, void 0, void 0, function* () {
                            return yield conversation_service_1.conversationService.createConversation(new conversation_service_1.SchemaConversation(id, _body.contacts[0].profile.name, _body.messages[0].from, _body.messages[0].id).conversation);
                        }))().then((responseCreateConversation) => resolve(responseCreateConversation.id))
                            .catch((error) => reject(error));
                    }
                }).then((idConversation) => {
                    const schemaMessage = new message_service_1.SchemaMessage(_body.messages[0].id, _body.messages[0].from, _body.messages[0].type, _body.messages[0][_body.messages[0].type]);
                    message_service_1.messageService.createMessage(schemaMessage.message, idConversation).then(() => {
                        res.send('EVENT_RECEIVED');
                    }).catch((error) => {
                        throw new Error('ERROR: CREACION DEL MENSAJE - ' + String(error));
                    });
                }).catch((error) => {
                    throw new Error('ERROR: EXTRACCION DE ID - ' + String(error));
                });
            }).catch((error) => {
                throw new Error('ERROR: REVISION DE CONVERSACION EXISTENTE - ' + String(error));
            });
        }
        catch (error) {
            res.status(400).send('NOT_RECEIVED');
        }
    }
}
exports.default = WhatsappController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_service_1 = __importDefault(require("../services/message.service"));
const whatsapp_service_1 = __importDefault(require("../services/whatsapp.service"));
class WhatsappController {
    verifyToken({ query }, res, _next) {
        try {
            const verificationStatus = whatsapp_service_1.default.verifyToken(String(query['hub.verify_token']), query['hub.challenge']);
            if (verificationStatus !== 'VERIFICATION_FAILED') {
                res.send(verificationStatus);
            }
            else {
                res.status(400).send(verificationStatus);
            }
        }
        catch (error) {
            res.status(400).send();
        }
    }
    receivedMessageWhatsapp({ body }, res, _next) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = message_service_1.default.SaveMessage(whatsapp_service_1.default.receivedMessageWhatsapp(body));
            res.send(message_service_1.default.getMessages);
        }
        catch (e) {
            res.send('EVENT_RECEIVED');
        }
    }
}
exports.default = WhatsappController;

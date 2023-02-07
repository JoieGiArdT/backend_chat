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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_service_1 = require("../services/conversation.service");
const message_service_1 = require("../services/message.service");
const task_service_1 = require("../services/task.service");
const whatsapp_service_1 = __importDefault(require("../services/whatsapp.service"));
const bot_util_1 = require("../utils/bot.util");
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
            body = body.entry[0].changes[0].value;
            task_service_1.taskService.getTaskById(body.contacts[0].wa_id)
                .then((responseGetTaskById) => {
                const responseGetParameterForAnswerTask = bot_util_1.botUtil.getParameterForAnswerTask({
                    answer: (responseGetTaskById[0] === undefined
                        ? 1
                        : (responseGetTaskById[0].data().sequence_task).length + 1),
                    response: body.messages[0]
                }, (body.messages[0].type === 'text'
                    ? body.messages[0][body.messages[0].type].body
                    : (responseGetTaskById[0] === undefined
                        ? 'No task'
                        : responseGetTaskById[0].data().type_task)));
                if (Object.entries(responseGetParameterForAnswerTask).length === 0) {
                    res.send('ES UNA CONVERSACION');
                }
                else if (responseGetTaskById[0] === undefined) {
                    void task_service_1.taskService.createTask(new task_service_1.SchemaTask(body.contacts[0].wa_id, body.messages[0][body.messages[0].type].body, [body.messages[0][body.messages[0].type].body]).task);
                }
                else {
                    void task_service_1.taskService.updateTask(body.contacts[0].wa_id, (responseGetTaskById[0].data().sequence_task).push('Nuevo'));
                }
                whatsapp_service_1.default.sendMessageWhatsapp(responseGetParameterForAnswerTask.parameters, responseGetParameterForAnswerTask.type, '113492004941110', 'EAAFlbvoSH6YBAKgPQ3qKg2EmuxOzLOH0vnsT5SwRyKZBnhJHKkBt3MZBVPS2szjZBjVikGBHCRHmzsDbWOnCSxBHAWLKC0xqQD7MawgunBy1PNQcPkaEPcznkSFRSBtyuo875MsAmx1SheMcZAeeftdQIUi60cHmXSI4mXozskBwXAOTbzl3gJliTfGOLYyy8Q68BMHMdQZDZD', body.messages[0].from)
                    .then(() => {
                    res.send('EVENT_RECEIVED');
                }).catch((error) => {
                    throw new Error('ERROR: ENVIANDO RESPUESTA - ' + String(error));
                });
            }).catch((error) => {
                throw new Error('ERROR: REVISION DE TASK PENDIENTES - ' + String(error));
            });
        }
        catch (error) {
            res.status(400).send('NOT_RECEIVED');
        }
    }
    requestTypeTask({ body }) {
        console.log(body);
    }
    requestTypeConversation({ body }, res) {
        const id = body.contacts[0].wa_id;
        conversation_service_1.conversationService.getConversationById(id).then((responseGetConversationById) => {
            new Promise((resolve, reject) => {
                if (responseGetConversationById[0] != null) {
                    resolve(responseGetConversationById[0].id);
                }
                else {
                    (() => __awaiter(this, void 0, void 0, function* () {
                        return yield conversation_service_1.conversationService.createConversation(new conversation_service_1.SchemaConversation(id, body.contacts[0].profile.name, body.messages[0].from, body.messages[0].id).conversation);
                    }))().then((responseCreateConversation) => resolve(responseCreateConversation.id))
                        .catch((error) => reject(error));
                }
            }).then((idConversation) => {
                const schemaMessage = new message_service_1.SchemaMessage(body.messages[0].id, body.messages[0].from, body.messages[0].type, body.messages[0][body.messages[0].type]);
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
}
exports.default = WhatsappController;

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
const conversation_service_1 = __importDefault(require("../services/conversation.service"));
const firestore_1 = require("firebase/firestore");
const firebase_database_1 = __importDefault(require("../config/firebase.database"));
const whatsapp_service_1 = __importDefault(require("./whatsapp.service"));
class MessageService {
    /**
   * Enviar mensaje desde el area de chat,
   * se tomara el id del chat en pantalla
   * para relacionarlo con la conversacion.
   */
    saveAndSentMessage(message, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_database_1.default.dataBase, 'messages'), Object.defineProperties(message, {
                timestamp: {
                    value: firestore_1.Timestamp.now
                },
                conversation_id: {
                    value: id
                }
            }));
        });
    }
    /**
   * Enviar mensaje fuera del chat, se
   * utiliza para iniciar conversaciones.
   */
    saveAndSentMessageAndCreateConversation(message, _to) {
        return __awaiter(this, void 0, void 0, function* () {
            let cb;
            switch (message.type) {
                case 'text': {
                    cb = whatsapp_service_1.default.sendText;
                    break;
                }
                case 'image':
                case 'document':
                case 'audio':
                case 'video':
                case 'sticker':
                case 'location':
                case 'contacts':
                    break;
                case 'interactive':
                    break;
                default: {
                    cb = () => {
                        return 'jeje';
                    };
                    break;
                }
            }
            yield whatsapp_service_1.default.sendMessageWhatsapp({
                to: _to,
                text: message.body,
                options: message.preview_url
            }, cb, process.env.ID_NUMBER, process.env.WP_TOKEN).then((resolve) => {
                conversation_service_1.default.createConversation({
                    external_id: resolve.whatsappId,
                    tarjet_information: {
                        display_name: 'Giovanni',
                        to: _to
                    },
                    last_message_id: resolve.messageId,
                    last_update: 'Prueba',
                    status: 'CERRADO',
                    atention_type: 'ADVISER'
                }).then(() => {
                    (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_database_1.default.dataBase, 'messages'), Object.defineProperty(message, 'timestamp', {
                        value: firestore_1.Timestamp.now
                    }));
                });
            });
        });
    }
    /**
   * Guardar mensajes recibidos por el
   * webhook de Whatsapp.
   */
    /* async saveMessageAndvalidateConversation (message: Message): Promise<void> {
      // recibidos de whatsapp
    } */
    getMessagesByConversationId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _query = (0, firestore_1.query)((0, firestore_1.collection)(firebase_database_1.default.dataBase, 'messages'), (0, firestore_1.where)('conversation_id', '==', id));
            const querySnapshot = yield (0, firestore_1.getDocs)(_query);
            const resultMessages = [];
            querySnapshot.forEach((doc) => {
                resultMessages.push(doc.data());
            });
            return resultMessages;
        });
    }
}
exports.default = new MessageService();

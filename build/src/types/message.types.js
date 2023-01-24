"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaMessage = void 0;
;
class SchemaMessage {
    constructor(externalId, fromNumber, typeMessage, contentMessage, conversationId) {
        this.message = {
            external_id: externalId,
            conversation_id: conversationId != null ? conversationId : '',
            from: fromNumber,
            type: typeMessage,
            timestamp: null,
            content_message: contentMessage
        };
    }
}
exports.SchemaMessage = SchemaMessage;

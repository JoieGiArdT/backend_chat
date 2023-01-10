'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const MessageSchema = new mongoose_1.Schema({
  message_id: {
    required: true,
    type: String
  },
  conversation_id: {
    required: true,
    type: String
  },
  from: {
    required: true,
    type: String
  },
  timestamp: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  }
})
exports.default = (0, mongoose_1.model)('messages', MessageSchema)

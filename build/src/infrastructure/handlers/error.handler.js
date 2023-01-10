'use strict'
const __createBinding = (this && this.__createBinding) || (Object.create
  ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    let desc = Object.getOwnPropertyDescriptor(m, k)
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function () { return m[k] } }
    }
    Object.defineProperty(o, k2, desc)
  }
  : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
  })
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
  ? function (o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v })
  }
  : function (o, v) {
    o.default = v
  })
const __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod
  const result = {}
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
  __setModuleDefault(result, mod)
  return result
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.apiErrorHandler = exports.unCoughtErrorHandler = void 0
const winston = __importStar(require('winston'))
/* const file = new winston.transports.File({
  filename: '../logs/error.log',
  level: 'error',
  handleExceptions: true
}) */
function unCoughtErrorHandler (err, _req, res, _next) {
  winston.error(JSON.stringify(err))
  res.end({ error: err })
}
exports.unCoughtErrorHandler = unCoughtErrorHandler
function apiErrorHandler (err, req, res, message) {
  const error = { Message: message, Request: req, Stack: err }
  winston.error(JSON.stringify(error))
  res.json({ Message: message })
}
exports.apiErrorHandler = apiErrorHandler

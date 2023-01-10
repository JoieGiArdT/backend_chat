import { Request, Response } from 'express'
import * as winston from 'winston'

/* const file = new winston.transports.File({
  filename: '../logs/error.log',
  level: 'error',
  handleExceptions: true
}) */

export function unCoughtErrorHandler (
  err: any,
  _req: Request,
  res: Response
): void {
  winston.error(JSON.stringify(err))
  res.end({ error: err })
}

export function apiErrorHandler (
  err: any,
  req: Request,
  res: Response,
  message: string
): void {
  const error: object = { Message: message, Request: req, Stack: err }
  winston.error(JSON.stringify(error))
  res.json({ Message: message })
}

import { Request, Response, NextFunction } from 'express'

interface LessonRequest extends Request {
  value?: { body?: string }
}
export default class LessonValidator {
  validateMessageObject () {
    return (req: LessonRequest, res: Response, next: NextFunction) => {
      try {
        const messageObject =
          req.body.entry[0].changes[0].value.messages[0]
        if (typeof messageObject !== 'undefined') {
          req.body = req.body.entry[0].changes[0].value
          next()
        } else {
          throw new Error('SIN_MENSAJE')
        }
      } catch (error) {
        res.send('EVENT_RECEIVED')
      }
    }
  }
}

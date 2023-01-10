import { Request, Response, Router } from 'express'

class WhatsappRoutes {
  router: Router = Router()
  constructor () {
    this.intializeRoutes()
  }

  intializeRoutes (): void {
    this.router.route('/mira').get((_req: Request, res: Response) => {
      res.send({ data: 'Hola' })
    })
  }
}

const router = (new WhatsappRoutes()).router
export { router }

import { Router } from 'express'
import WhatsappController from '../controllers/whatsapp.controller'

class WhatsappRoutes {
  router: Router = Router()
  whatsappController = new WhatsappController()
  constructor () {
    this.intializeRoutes()
  }

  intializeRoutes (): void {
    this.router.route('/').get(this.whatsappController.verifyToken)
  }
}

const router = (new WhatsappRoutes()).router
export { router }

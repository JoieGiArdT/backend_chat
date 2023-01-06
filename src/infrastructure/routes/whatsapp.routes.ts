import { Router } from "express";
import WhatsappController from "../controllers/whatsapp.controller";
import WhatsappValidator from "../validators/whatsapp.validator";

class WhatsappRoutes {
  router: Router = Router();
  whatsappValidator = new WhatsappValidator();
  whatsappController = new WhatsappController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route("/").get(this.whatsappController.VerifyToken);
    this.router.route("/").post(this.whatsappValidator.validateMessageObject(),
      this.whatsappController.ReceivedMessage);
  }
}

const router = (new WhatsappRoutes()).router;
export{router}
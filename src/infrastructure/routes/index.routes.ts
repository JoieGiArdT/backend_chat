import { Application } from 'express';
import whatsappRoutes from './whatsapp.routes';
import messagesRoutes from './messages.routes';

export default class Routes {

  constructor(app: Application) {
    app.use('/v1/whatsapp', whatsappRoutes);
    app.use('/v1/messages', messagesRoutes);
  }
}
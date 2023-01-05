import { Router, Application } from 'express';
import { readdirSync } from "fs";

export default class Routes {
  PATH_ROUTER = `${__dirname}`;
  router = Router();

  constructor(app: Application) {
    this.intializeRoutes(app);
  }

  intializeRoutes(app: Application) {
    readdirSync(this.PATH_ROUTER).filter((fileName) => {
      const route = this.getRouteName(fileName);
      if (route !== "index") {
        import(`./${route}.routes`).then((moduleRouter) => {
          app.use(`/${route}`, moduleRouter.router );
        }); 
      }
    });
    
  }

  getRouteName(fileName: String){
    return fileName.split(".").shift();
  }
}

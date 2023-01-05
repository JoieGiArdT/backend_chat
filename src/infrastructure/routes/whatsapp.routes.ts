import { Router } from 'express';
import WhatsappController from '../controllers/whatsapp.controller';
//import { LessonValidator, lessonSchema } from '../validators/lessonValidator';

/* class WhatsappRoutes {
  router = Router();
  whatsappController = new WhatsappController();
  lessonValidator = new LessonValidator();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route('/').get(this.lessonsCtrl.getAllLessons);
    this.router.route('/course/:id')
      .get(this.lessonsCtrl.getLessonByCourse);
    this.router.route('/:id').get(this.lessonsCtrl.getLessonById);
    this.router.route('/')
      .post(
        this.lessonValidator.validateBody(lessonSchema),
        this.lessonsCtrl.createLesson
      );
    this.router.route('/:id')
      .put(
        this.lessonValidator.validateBody(lessonSchema),
        this.lessonsCtrl.updateLesson
      );
    this.router.route('/:id').delete(this.lessonsCtrl.deleteLesson);
  }
}

export default new LessonRoutes().router; */
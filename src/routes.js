import { Router } from 'express';

import sessionController from './app/controllers/SessionController';
import studentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);

routes.post('/students', studentController.store);
routes.put('/students/:id', studentController.update);

export default routes;

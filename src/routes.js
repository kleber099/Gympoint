import { Router } from 'express';

import sessionController from './app/controllers/SessionController';
import studentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', sessionController.store);

routes.post('/students', studentController.store);
routes.put('/students/:id', studentController.update);

export default routes;

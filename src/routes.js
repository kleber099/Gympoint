import { Router } from 'express';

import sessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => res.send('GYMPOINT'));

routes.post('/sessions', sessionController.store);

export default routes;

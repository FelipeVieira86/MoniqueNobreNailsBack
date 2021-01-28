import { Router } from 'express';
import { UsersController, ClientsController, ProceduresController } from './controllers';
import { validateUserCreation, validateClientCreation } from './middlewares';

const routes = Router();

routes.post('/users', validateUserCreation, UsersController.create);

routes.get('/clients', ClientsController.list);

routes.post('/clients', validateClientCreation, ClientsController.create);

routes.post('/procedures', ProceduresController.create);

export default routes;

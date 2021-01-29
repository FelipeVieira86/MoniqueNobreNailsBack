import { Router } from 'express';
import users from './users';
import clients from './clients';
import procedures from './procedures';
import login from './login';

const routes = Router();

routes.use('/login', login);

routes.use('/users', users);

routes.use('/clients', clients);

routes.use('/procedures', procedures);

export default routes;

import { Router } from 'express';
import { ClientsController } from '../controllers';
import { validateClientCreation, verifyAuth } from '../middlewares';

const clients = Router();

clients.get('/:id', ClientsController.show);

clients.get('/', ClientsController.index);

clients.post('/', verifyAuth, validateClientCreation, ClientsController.create);

clients.delete('/:id', verifyAuth, ClientsController.exclude);

clients.put('/:id', verifyAuth, ClientsController.update);

export default clients;

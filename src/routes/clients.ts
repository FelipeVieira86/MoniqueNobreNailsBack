import { Router } from 'express';

import { ClientsController } from '../controllers';
import { validateClientCreation } from '../middlewares';

const clients = Router();

clients.get('/:id', ClientsController.show);

clients.get('/', ClientsController.index);

clients.post('/', validateClientCreation, ClientsController.create);

export default clients;

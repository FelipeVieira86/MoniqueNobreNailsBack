import { Router } from 'express';
import { UsersController } from '../controllers';
import { validateUserCreation } from '../middlewares';

const users = Router();

// users.get('/:id', UsersController.show);

users.get('/', UsersController.list);

users.post('/', validateUserCreation, UsersController.create);

export default users;

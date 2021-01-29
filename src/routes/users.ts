import { Router } from 'express';
import { UsersController } from '../controllers';
import { validateUserCreation } from '../middlewares';

const users = Router();

users.post('/', validateUserCreation, UsersController.create);

users.get('/', UsersController.list);

export default users;

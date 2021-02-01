import { Router } from 'express';
import { UsersController } from '../controllers';
import { validateUserCreation, verifyAuth } from '../middlewares';

const users = Router();

users.get('/:id', UsersController.show);

users.get('/', UsersController.list);

users.post('/', verifyAuth, validateUserCreation, UsersController.create);

users.delete('/:id', verifyAuth, UsersController.exclude);

users.put('/:id', verifyAuth, UsersController.update);

export default users;

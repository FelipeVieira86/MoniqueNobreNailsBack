import { Router } from 'express';

import { LoginController } from '../controllers';

const login = Router();

login.get('/', LoginController.login);

export default login;

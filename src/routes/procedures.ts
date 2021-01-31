import { Router } from 'express';

import { ProceduresController } from '../controllers';
import { validateProcedureCreation, verifyAuth } from '../middlewares';

const procedures = Router();

procedures.post('/', verifyAuth, validateProcedureCreation, ProceduresController.create);

export default procedures;

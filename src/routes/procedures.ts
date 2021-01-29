import { Router } from 'express';

import { ProceduresController } from '../controllers';

const procedures = Router();

procedures.post('/', ProceduresController.create);

export default procedures;

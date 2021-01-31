import { Request, Response } from 'express';
import { procedureServices } from '../services';
import { verifyToken } from '../auth';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      day, method, type, value, client,
    } = req.body;

    const data = {
      day, method, type, value, client,
    };

    const newProcedure = await procedureServices.createProcedure(data);

    return res.status(201).json(newProcedure);
  },
  async exclude(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (authorization) {
      const verifiedUserInfo = verifyToken(authorization);
      const user: any = verifiedUserInfo;
      await procedureServices.deleteProcedure(id, user);
      res.status(203).json({ message: 'Procedimento deletado com sucesso' });
    }

    throw Error('Unauthorized');
  },
};

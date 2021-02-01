import { Request, Response } from 'express';
import { procedureServices } from '../services';

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
    await procedureServices.deleteProcedure(id);
    return res.status(203).json({ message: 'Procedimento deletado com sucesso' });
  },
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await procedureServices.updateProcedure(id, req.body);
    return res.status(203).json({ message: 'Procedimento atualizado com sucesso' });
  },
};

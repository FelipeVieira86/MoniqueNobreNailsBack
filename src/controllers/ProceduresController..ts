import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Procedures from '../models/Procedures';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      day, method, type, value, client,
    } = req.body;

    const proceduresRepository = getRepository(Procedures);

    const newProcedure = proceduresRepository.create({
      day, method, type, value, client,
    });

    await proceduresRepository.save(newProcedure);

    return res.status(201).json(newProcedure);
  },
};

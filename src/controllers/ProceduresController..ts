import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Procedures } from '../models';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        day, method, type, value, client,
      } = req.body;

      const proceduresRepository = getRepository(Procedures);

      const newProcedure = proceduresRepository.create({
        day, method, type, value, client,
      });

      await proceduresRepository.save(newProcedure);

      return res.status(201).json(newProcedure);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Procedures } from '../models';
import { createProceduresSchema } from '../validations';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      day, method, type, value, client,
    } = req.body;

    const proceduresRepository = getRepository(Procedures);

    const data = {
      day, method, type, value, client,
    };

    await createProceduresSchema.validate(data, { abortEarly: false });
    const newProcedure = proceduresRepository.create(data);

    await proceduresRepository.save(newProcedure);

    return res.status(201).json(newProcedure);
  },
};

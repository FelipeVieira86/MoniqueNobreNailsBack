import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Clients from '../models/Clients';

async function validateClientCreation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const {
    email,
  } = req.body;
  const clientsRepository = getRepository(Clients);
  const foundUserEmail = await clientsRepository.findOne({ email });

  if (foundUserEmail) {
    return res.status(409).json({ error: 'email already registered' });
  }

  return next();
}

export default validateClientCreation;

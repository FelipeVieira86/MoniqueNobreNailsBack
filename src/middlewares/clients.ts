import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Clients } from '../models';
import { createClientSchema } from '../validations';

async function validateClientCreation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const {
    name, email, phone, birthdate,
  } = req.body;

  const data = {
    name, email, phone, birthdate, procedures: [],
  };

  await createClientSchema.validate(data, { abortEarly: false });

  const clientsRepository = getRepository(Clients);

  const foundUserEmail = await clientsRepository.findOne({ email });

  if (foundUserEmail) {
    return res.status(409).json({ error: 'email already registered' });
  }

  return next();
}

export default validateClientCreation;

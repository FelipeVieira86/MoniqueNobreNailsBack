import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../models';
import { createUserSchema } from '../validations';

async function validateUserCreation(req: Request, res: Response, next: NextFunction): Promise<any> {
  const {
    name, email, login, password, admin,
  } = req.body;

  const data = {
    name, email, login, password, admin,
  };

  await createUserSchema.validate(data, { abortEarly: false });

  const usersRepository = getRepository(Users);

  const foundUserEmail = await usersRepository.findOne({ email });
  const foundUserLogin = await usersRepository.findOne({ login });

  if (foundUserEmail) {
    return res.status(409).json({ error: 'email already registered' });
  }

  if (foundUserLogin) {
    return res.status(409).json({ error: 'username already registered' });
  }

  return next();
}

export default validateUserCreation;

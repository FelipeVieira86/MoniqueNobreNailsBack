import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';

async function validateUserCreation(req: Request, res: Response, next: NextFunction): Promise<any> {
  const {
    email, login,
  } = req.body;
  const usersRepository = getRepository(Users);
  const foundUserEmail = await usersRepository.findAndCount({ email });
  const foundUserLogin = await usersRepository.findAndCount({ login });

  if (foundUserEmail[1] !== 0) {
    return res.status(409).json({ error: 'email already registered' });
  }

  if (foundUserLogin[1] !== 0) {
    return res.status(409).json({ error: 'username already registered' });
  }

  return next();
}

export default validateUserCreation;

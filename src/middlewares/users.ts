import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';

async function validateUserCreation(req: Request, res: Response, next: NextFunction): Promise<any> {
  const {
    email, login,
  } = req.body;
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

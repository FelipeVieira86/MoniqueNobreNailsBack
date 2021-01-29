import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../models';

export default {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password } = req.body;
      const usersRepository = getRepository(Users);

      const existingUsers = await usersRepository.findOneOrFail({ where: { login, password } });
      const { password: _, ...userInfo } = existingUsers;

      return res.status(200).json({ userInfo });
    } catch (err) {
      if (err.name === 'EntityNotFound') {
        res.status(409).json({ message: 'Usuário e/ou senha inválidos' });
      }
      return res.status(500).json(err);
    }
  },
};

import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Users } from '../models';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name, email, login, password, admin,
      } = req.body;

      const usersRepository = getRepository(Users);

      const newUser = usersRepository.create({
        name, email, login, password, admin,
      });

      await usersRepository.save(newUser);

      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name = '',
      } = req.body;

      const usersRepository = getRepository(Users);

      const usersList = await usersRepository.find({ name: Like(`%${name}%`) });

      return res.status(200).json(usersList);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

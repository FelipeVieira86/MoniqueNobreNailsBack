import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import Users from '../models/Users';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, login, password, admin,
    } = req.body;

    const usersRepository = getRepository(Users);

    const newUser = usersRepository.create({
      name, email, login, password, admin,
    });

    await usersRepository.save(newUser);

    return res.status(201).json(newUser);
  },
  async list(req: Request, res: Response): Promise<Response> {
    const {
      name,
    } = req.body;

    const usersRepository = getRepository(Users);

    const usersList = await usersRepository.find({ name: Like(`%${name}%`) });

    return res.status(200).json(usersList);
  },
};

import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Users } from '../models';
import { createUserSchema } from '../validations';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, login, password, admin,
    } = req.body;

    const usersRepository = getRepository(Users);

    const data = {
      name, email, login, password, admin,
    };
    await createUserSchema.validate(data, { abortEarly: false });
    const newUser = usersRepository.create(data);

    await usersRepository.save(newUser);

    return res.status(201).json(newUser);
  },
  async list(req: Request, res: Response): Promise<Response> {
    const { name = '' } = req.body;

    const usersRepository = getRepository(Users);

    const usersList = await usersRepository.find({ where: { name: Like(`%${name}%`) } });

    return res.status(200).json(usersList);
  },
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOneOrFail({ where: { id } });

    const { password: _, ...userInfo } = user;

    return res.status(200).json(userInfo);
  },
};

import { Request, Response } from 'express';
import { usersServices } from '../services';
import { verifyToken } from '../auth';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const newUser = await usersServices.createUser(req.body);

    return res.status(201).json(newUser);
  },
  async list(req: Request, res: Response): Promise<Response> {
    const { name = '' } = req.body;

    const usersList = await usersServices.getUsersList(name);

    return res.status(200).json(usersList);
  },
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user = await usersServices.getOneUser(id);

    return res.status(200).json(user);
  },
  async exclude(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (authorization) {
      const verifiedUserInfo = verifyToken(authorization);
      const user: any = verifiedUserInfo;
      await usersServices.deleteUser(id, user);
      res.status(203).json({ message: 'Usuário deletado com sucesso' });
    }

    throw Error('Unauthorized');
  },
};

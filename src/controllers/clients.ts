import { Request, Response } from 'express';
import { verifyToken } from '../auth';
import { clientServices } from '../services';

import { clientsView } from '../views';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, phone, birthdate,
    } = req.body;

    const data = {
      name, email, phone, birthdate, procedures: [],
    };

    const newClient = await clientServices.createClient(data);

    return res.status(201).json(clientsView.render(newClient));
  },
  async index(req: Request, res: Response): Promise<Response> {
    const {
      name = '',
    } = req.body;

    const clientsList = await clientServices.getClientList(name);

    return res.status(200).json(clientsView.renderMany(clientsList));
  },
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const client = await clientServices.getOneClient(id);

    return res.status(200).json(clientsView.render(client));
  },
  async exclude(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (authorization) {
      const verifiedUserInfo = verifyToken(authorization);
      const user: any = verifiedUserInfo;
      await clientServices.deleteClient(id, user);
      res.status(203).json({ message: 'Cliente deletado com sucesso' });
    }

    throw Error('Unauthorized');
  },
};

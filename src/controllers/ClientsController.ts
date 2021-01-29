import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';

import { Clients } from '../models';
import { clientsView } from '../views';
import { createClientSchema } from '../validations';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, phone, birthdate,
    } = req.body;

    const clientsRepository = getRepository(Clients);

    const data = {
      name, email, phone, birthdate, procedures: [],
    };

    await createClientSchema.validate(data, { abortEarly: false });
    const newClient = clientsRepository.create(data);

    await clientsRepository.save(newClient);

    return res.status(201).json(clientsView.render(newClient));
  },
  async index(req: Request, res: Response): Promise<Response> {
    const {
      name = '',
    } = req.body;

    const clientsRepository = getRepository(Clients);

    const clientsList = await clientsRepository.find({ where: { name: Like(`%${name}%`) }, relations: ['procedures'] });

    return res.status(200).json(clientsView.renderMany(clientsList));
  },
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const clientsRepository = getRepository(Clients);

    const client = await clientsRepository.findOneOrFail({ where: { id }, relations: ['procedures'] });
    return res.status(200).json(clientsView.render(client));
  },
};

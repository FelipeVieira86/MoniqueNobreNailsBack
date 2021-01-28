import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import Clients from '../models/Clients';
import clientsView from '../views/clientsView';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, phone, birthdate,
    } = req.body;

    const clientsRepository = getRepository(Clients);

    const newClient = clientsRepository.create({
      name, email, phone, birthdate, procedures: [],
    });

    await clientsRepository.save(newClient);

    return res.status(201).json(clientsView.render(newClient));
  },
  async list(req: Request, res: Response): Promise<Response> {
    const {
      name,
    } = req.body;

    const clientsRepository = getRepository(Clients);

    const clientsList = await clientsRepository.find({ where: { name: Like(`%${name}%`) }, relations: ['procedures'] });

    return res.status(200).json(clientsView.renderMany(clientsList));
  },
};

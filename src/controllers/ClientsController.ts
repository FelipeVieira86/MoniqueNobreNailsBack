import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Clients } from '../models';
import clientsView from '../views/clientsView';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name, email, phone, birthdate,
      } = req.body;

      const clientsRepository = getRepository(Clients);

      const newClient = clientsRepository.create({
        name, email, phone, birthdate, procedures: [],
      });

      await clientsRepository.save(newClient);

      return res.status(201).json(clientsView.render(newClient));
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name = '',
      } = req.body;

      const clientsRepository = getRepository(Clients);

      const clientsList = await clientsRepository.find({ where: { name: Like(`%${name}%`) }, relations: ['procedures'] });

      return res.status(200).json(clientsView.renderMany(clientsList));
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const clientsRepository = getRepository(Clients);

      const client = await clientsRepository.findOneOrFail({ where: { id }, relations: ['procedures'] });
      return res.status(200).json(clientsView.render(client));
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

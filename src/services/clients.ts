import { getRepository, Like } from 'typeorm';
import { ICreateClientData, ValidationErrors, ValidationErrors } from '../types';
import { Clients } from '../models';

export default {
  async createClient(data: ICreateClientData): Promise<Clients> {
    const clientsRepository = getRepository(Clients);

    const newClient = clientsRepository.create(data);

    await clientsRepository.save(newClient);

    return newClient;
  },
  async getClientList(name: string): Promise<Clients[]> {
    const clientsRepository = getRepository(Clients);

    const clientsList = await clientsRepository.find({ where: { name: Like(`%${name}%`) }, relations: ['procedures'] });

    return clientsList;
  },
  async getOneClient(id: string): Promise<Clients> {
    const clientsRepository = getRepository(Clients);

    const client = await clientsRepository.findOneOrFail({ where: { id }, relations: ['procedures'] });

    return client;
  },
  async deleteClient(id: string, userInfo: { admin : boolean }): Promise<any> {
    const clientsRepository = getRepository(Clients);
    await clientsRepository.findOneOrFail({ where: { id } });
    if (userInfo.admin) {
      const deletedUser = await clientsRepository.delete(id);
      return deletedUser;
    }

    throw Error('Unauthorized');
  },
};

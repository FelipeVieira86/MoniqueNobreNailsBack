import { getRepository } from 'typeorm';
import { ICreateProcedureData } from '../types';
import { Procedures, Clients } from '../models';

export default {
  async createProcedure(data: ICreateProcedureData): Promise<Procedures> {
    const proceduresRepository = getRepository(Procedures);
    const clientsRepository = getRepository(Clients);
    await clientsRepository.findOneOrFail({ where: { id: data.client } });
    const newProcedure = proceduresRepository.create(data);

    await proceduresRepository.save(newProcedure);

    return newProcedure;
  },
  async deleteProcedure(id: string): Promise<void> {
    const proceduresRepository = getRepository(Procedures);
    await proceduresRepository.findOneOrFail({ where: { id } });
    await proceduresRepository.delete(id);
  },
};

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
  async deleteProcedure(id: string, userInfo: { admin : boolean }): Promise<any> {
    const proceduresRepository = getRepository(Procedures);
    await proceduresRepository.findOneOrFail({ where: { id } });
    if (userInfo.admin) {
      const deletedProcedure = await proceduresRepository.delete(id);
      return deletedProcedure;
    }

    throw Error('Unauthorized');
  },
};

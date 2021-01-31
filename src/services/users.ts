import { getRepository, Like } from 'typeorm';
import { Users } from '../models';
import { ICreateUserData, IUserInfo } from '../types';

export default {
  async createUser(data: ICreateUserData): Promise<Users> {
    const usersRepository = getRepository(Users);

    const newUser = usersRepository.create(data);

    await usersRepository.save(newUser);

    return newUser;
  },
  async getUsersList(name: string): Promise<Users[]> {
    const usersRepository = getRepository(Users);

    const usersList = await usersRepository.find({ where: { name: Like(`%${name}%`) } });

    return usersList;
  },
  async getOneUser(id: string): Promise<IUserInfo> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOneOrFail({ where: { id } });
    const { password: _, ...userInfo } = user;

    return userInfo;
  },
  async deleteUser(id: string, userInfo: { admin : boolean }): Promise<any> {
    const usersRepository = getRepository(Users);
    await usersRepository.findOneOrFail({ where: { id } });
    if (userInfo.admin) {
      const deletedUser = await usersRepository.delete(id);
      return deletedUser;
    }

    throw Error('Unauthorized');
  },
};

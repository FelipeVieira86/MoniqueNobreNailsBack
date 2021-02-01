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
  async deleteUser(id: string): Promise<void> {
    const usersRepository = getRepository(Users);
    await usersRepository.findOneOrFail({ where: { id } });
    await usersRepository.delete(id);
  },
  async updateUser(id: string, data: ICreateUserData): Promise<void> {
    const usersRepository = getRepository(Users);
    await usersRepository.findOneOrFail({ where: { id } });
    await usersRepository.update(id, data);
  },
};

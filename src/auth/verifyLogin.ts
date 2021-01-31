import { getRepository } from 'typeorm';
import { createToken } from './token';
import { Users } from '../models';
import { ILoginInfo } from '../types';

export default async (loginInfo: ILoginInfo): Promise<string> => {
  const { login, password } = loginInfo;
  const usersRepository = getRepository(Users);

  const existingUser = await usersRepository.findOne({ where: { login, password } });
  if (existingUser) {
    const { password: _, ...userInfo } = existingUser;
    const token = createToken(userInfo);
    return token;
  }
  throw new Error('UserNotFound');
};

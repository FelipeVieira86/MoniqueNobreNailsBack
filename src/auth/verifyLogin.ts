import { getRepository } from 'typeorm';
import { createToken } from './token';
import { Users } from '../models';

export interface ILoginInfo {
  login: string
  password: string
}

export default async (loginInfo: ILoginInfo): Promise<string> => {
  const { login, password } = loginInfo;
  const usersRepository = getRepository(Users);

  const existingUser = await usersRepository.findOneOrFail({ where: { login, password } });
  const { password: _, ...userInfo } = existingUser;
  const token = createToken(userInfo);

  return token;
};

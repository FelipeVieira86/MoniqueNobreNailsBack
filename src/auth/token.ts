/* eslint-disable @typescript-eslint/ban-types */
import jwt from 'jsonwebtoken';
import secret from './secret';
import { IToken } from '../types';

const headers = { expiresIn: '1h' };

const createToken = (payload: IToken | string | object): string => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

const verifyToken = (token: string): string | object => {
  const verifiedToken = jwt.verify(token, secret);

  return verifiedToken;
};

export { createToken, verifyToken };

import jwt from 'jsonwebtoken';
import secret from './secret';

const headers = { expiresIn: '1h' };

export interface Itoken { id: number; name: string; email: string; login: string; admin: boolean; }

const createToken = (payload: Itoken): string => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const verifyToken = (token: string): string | object => {
  const verifiedToken = jwt.verify(token, secret);

  return verifiedToken;
};

export { createToken, verifyToken };

import { Request, Response, NextFunction } from 'express';
import { verifyToken, createToken } from '../auth';

function verifyAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;
  if (authorization) {
    const a: any = authorization;
    const verifiedInfo = verifyToken(a);

    // req.headers.authorization = createToken(verifiedInfo);
  } else {
    throw Error('Unauthorized');
  }
  return next();
}

export default verifyAuth;

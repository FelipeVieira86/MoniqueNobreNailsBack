import { Request, Response } from 'express';
import { verifyLogin } from '../auth';

export default {
  async login(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body;
    const token = await verifyLogin({ login, password });
    req.headers.authorization = token;

    return res.status(200).json({ token });
  },
};

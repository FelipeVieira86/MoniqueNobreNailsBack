import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _) => {
  console.error(err);

  return res.status(500).json({ message: 'Ops, algo deu errado' });
};

export default errorHandler;

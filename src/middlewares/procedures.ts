import { Request, Response, NextFunction } from 'express';
import { createProceduresSchema } from '../validations';

async function validateProcedureCreation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const {
    day, method, type, value, client,
  } = req.body;

  const data = {
    day, method, type, value, client,
  };

  await createProceduresSchema.validate(data, { abortEarly: false });

  return next();
}

export default validateProcedureCreation;

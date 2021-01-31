import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { ValidationErrors } from '../types';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('errrrouuuu', err);

  if (err instanceof ValidationError) {
    const errors: ValidationErrors = {};
    err.inner.forEach((error) => {
      errors[error.path || 'error'] = error.errors;
    });
    return res.status(400).json({ message: 'Validation error', errors });
  }

  if (err.name === 'EntityNotFound') {
    res.status(409).json({ message: 'Não encontrado' });
  }

  if (err.message === 'Unauthorized') {
    res.status(401).json({ message: 'Não autorizado' });
  }

  if (err.message === 'UserNotFound') {
    res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
  }

  return res.status(500).json({ message: 'Hamm, acho que algo deu errado, né?' });
};

export default errorHandler;

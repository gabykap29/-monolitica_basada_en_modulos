import { decodeToken } from '../helpers/jwt';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../Server/helpers/customError';
import { IContentToken } from '../helpers/jwt';

const extractRole = async (
  req: Request,
  res: Response,
): Promise<IContentToken | boolean> => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return false;
    }
    const decode = await decodeToken(header);
    if (!decode) {
      return false;
    }
    return decode;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkRolAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decoded = await extractRole(req, res);

    if (decoded && (decoded as IContentToken).role === 'admin') {
      // Si el usuario tiene rol "admin", pasa al siguiente middleware
      return next();
    } else {
      // Si no tiene rol "admin", responde con error de autorización
      throw new CustomError(401, 'No autorizado!');
    }
  } catch (error) {
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    res.status(statusCode).json({
      status: statusCode,
      message:
        error instanceof CustomError ? error.message : 'Error en el servidor',
    });
  }
};

export const checkRolStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decoded = await extractRole(req, res);

    if (decoded && (decoded as IContentToken).role === 'student') {
      // Si el usuario tiene rol "admin", pasa al siguiente middleware
      return next();
    } else {
      // Si no tiene rol "admin", responde con error de autorización
      throw new CustomError(401, 'No autorizado!');
    }
  } catch (error) {
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    res.status(statusCode).json({
      status: statusCode,
      message:
        error instanceof CustomError ? error.message : 'Error en el servidor',
    });
  }
};

export const checkRolPreceptor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decoded = await extractRole(req, res);

    if (decoded && (decoded as IContentToken).role === 'preceptor') {
      // Si el usuario tiene rol "admin", pasa al siguiente middleware
      return next();
    } else {
      // Si no tiene rol "admin", responde con error de autorización
      throw new CustomError(401, 'No autorizado!');
    }
  } catch (error) {
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    res.status(statusCode).json({
      status: statusCode,
      message:
        error instanceof CustomError ? error.message : 'Error en el servidor',
    });
  }
};

import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import { decodeToken } from '../../Auth/helpers/jwt';

async function extractUsername(header: string) {
  if (!header) {
    return 'No logged';
  }
  const user = decodeToken(header);

  if (user === false || user === true) {
    return 'No logged';
  }

  return user.username;
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './src/Aud/error/error.log', level: 'error' }),
    new winston.transports.File({ filename: './src/Aud/logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// Middleware de registro
export const loggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Extrae el nombre de usuario desde el header
  const header = req.headers.authorization || '';
  const username = await extractUsername(header);

  // Crea un objeto log con propiedades separadas
  const logData = {
    usuario: username,
    cliente: req.ip || req.headers['x-forwarded-for'],
    metodo: req.method,
    url: req.url,
    estado: res.statusCode,
  };

  // Registra cada campo en el objeto
  logger.info(logData);

  next();
};
export default logger;

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
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
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
  const header = req.headers.authorization || '';
  const username = await extractUsername(header);
  logger.info(
    `Usuario: ${username} Cliente: ${req.ip || req.headers['x-forwarded-for']}  Method: ${req.method} - URL: ${req.url} - Status: ${res.statusCode},`,
  );
  next();
};

export default logger;

import jwt from 'jsonwebtoken';
import { secretJWT } from '../config/config';

export interface IContentToken {
  id: String;
  role: String;
  username: String;
}

export const generateToken = (payload: any) => {
  return jwt.sign(payload, secretJWT, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secretJWT);
};

export const decodeToken = (token: string): IContentToken | boolean => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === 'string') {
      return false;
    }
    const { id, role, username } = decoded as jwt.JwtPayload;
    if (
      typeof id === 'string' &&
      typeof role === 'string' &&
      typeof username === 'string'
    ) {
      return { id, role, username };
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

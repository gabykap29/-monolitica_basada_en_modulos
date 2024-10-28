import jwt from "jsonwebtoken";
import { secretJWT } from "../config/config";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, secretJWT, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secretJWT);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

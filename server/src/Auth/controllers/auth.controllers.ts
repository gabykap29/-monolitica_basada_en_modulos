import AuthService from '../service/AuthService';
import { Request, Response } from 'express';
import { CustomError } from '../../Server/helpers/customError';

class AuthCtrl {
  private authService: AuthService = new AuthService();
  constructor() {}
  async login(req: Request, res: Response) {
    try {
      const { username, pass } = req.body;
      if (!username && !pass) {
        const err = new CustomError(
          400,
          'El username y la contraeña son requeridos!',
        );
        res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
      }
      const userLogin = await this.authService.login(username, pass);
      if (userLogin instanceof CustomError) {
        console.error('Error en getUser:', userLogin);
        res.status(userLogin.statusCode).json(userLogin);
        return;
      }
      const { token, dataUser } = userLogin;
      res.status(200).json({
        status: 200,
        message: 'Inciió sesión correctamente!',
        token: token,
        dataUser: dataUser,
      });
    } catch (error) {
      const err = new CustomError(
        500,
        'Error interno del servidor al iniciar sesión',
      );
      console.error('Error en getUser:', error);
      res.status(err.statusCode).json(err);
      return;
    }
  }
}

export default AuthCtrl;

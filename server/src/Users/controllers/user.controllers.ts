import { Request, Response, NextFunction } from 'express';
import UserService from '../service/UserService';
import { CustomError } from '../../Server/helpers/customError';

class UserCtrl {
  private userService: UserService = new UserService();

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { typeUser } = req.params;
      if (!typeUser) {
        const err = new CustomError(400, 'El tipo de usuario es requerido!');
        res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message,
        });
      }
      const users = await this.userService.getAllUser(typeUser);
      if (users instanceof CustomError) {
        console.error('Error en getUsers:', users);
        res.status(users.statusCode).json(users);
        return;
      }
      res.status(200).json({
        status: 200,
        users: users,
      });
    } catch (error) {
      const err = new CustomError(500, 'Error interno del servidor');
      console.error('Error en getUsers:', error);
      res.status(err.statusCode).json(err);
      return;
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getOne(id);
      if (user instanceof CustomError) {
        console.error('Error en getUser:', user);
        res.status(user.statusCode).json(user);
        return;
      }
      res.status(200).json({
        status: 200,
        user: user,
      });
    } catch (error) {
      const err = new CustomError(500, 'Error interno del servidor');
      console.error('Error en getUser:', error);
      res.status(err.statusCode).json(err);
      return;
    }
  }

  async userCreate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body;
      const creationResult = await this.userService.create(body);
      if (creationResult instanceof CustomError) {
        console.error('Error en getUser:', creationResult);
        res.status(creationResult.statusCode).json(creationResult);
        return;
      }
      res.status(201).json({
        status: 201,
        message: 'Usuario creado correctamente!',
        user: creationResult
      });
    } catch (error) {
      const err = new CustomError(500, 'Error interno del servidor');
      console.error('Error en userCreate:', error);
      res.status(err.statusCode).json(err);
      return;
    }
  }

  async userUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateResult = await this.userService.update(id, body);
      if (updateResult instanceof CustomError) {
        console.error('Error en userUpdate:', updateResult);
        res.status(updateResult.statusCode).json(updateResult);
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Usuario actualizado con éxito!',
        user: updateResult
      });
    } catch (error) {
      const err = new CustomError(500, 'Error interno del servidor');
      console.error('Error en userUpdate:', error);
      res.status(err.statusCode).json(err);
      return;
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const deletionResult = await this.userService.delete(id);
      if (deletionResult instanceof CustomError) {
        console.error('Error en deleteUser:', deletionResult);
        res.status(deletionResult.statusCode).json(deletionResult);
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Usuario eliminado correctamente!',
      });
    } catch (error) {
      const err = new CustomError(500, 'Error interno del servidor');
      console.error('Error en deleteUser:', error);
      res.status(err.statusCode).json(err);
      return;
    }
  }
}

export default UserCtrl;

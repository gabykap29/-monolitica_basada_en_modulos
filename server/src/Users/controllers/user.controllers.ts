import { Request, Response, NextFunction } from "express";
import UserService from "../service/UserService";

class UserCtrl {
  private userService: UserService = new UserService();
  
  async getUsers(_req: Request, res: Response, next: NextFunction): Promise <void> {
    try {
      const users = await this.userService.getAllUser();
       res.status(200).json({
        status: 200,
        users: users
      });
    } catch (error) {
      next(error);  // Asegúrate de manejar el error con next()
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise <void>  {
    try {
      const { id } = req.params;
      const user = await this.userService.getOne(id);
       res.status(200).json({
        status: 200,
        user: user
      });
    } catch (error) {
      next(error);
    }
  }

  async userCreate(req: Request, res: Response, next: NextFunction): Promise <void>  {
    try {
      const body = req.body;
      await this.userService.create(body);
       res.status(201).json({
        status: 201,
        message: "Usuario creado correctamente!"
      });
    } catch (error) {
      next(error);
    }
  }

  async userUpdate(req: Request, res: Response, next: NextFunction): Promise <void>  {
    try {
      const { id } = req.params;
      const body = req.body;
      await this.userService.update(id, body);
       res.status(200).json({
        status: 200,
        message: "Usuario actualizado con éxito!"
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise <void>  {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
       res.status(200).json({
        status: 200,
        message: "Usuario eliminado correctamente!"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserCtrl;

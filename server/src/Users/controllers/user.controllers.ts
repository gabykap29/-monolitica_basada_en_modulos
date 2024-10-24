import UserService from "../service/UserService";
import { Request, Response } from "express";

class UserCtrl{
    private userService : UserService = new UserService();
    constructor(){}
    async getUsers(_req: Request, res: Response){
        try {
            const users = await this.userService.getAllUser();
            return res.status(200).json({
                status:200,
                users: users
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor!" 
            });
        }
    }
    async getUser(req: Request, res: Response){
        try {
            const {id} = req.params;
            const user = await this.userService.getOne(id);
            return res.status(200).json({
                status:200,
                user: user
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor!" 
            });
        }        
    }
    async userCreate(req: Request, res: Response){
        try {
            const body = req.body;
            const newUser= await this.userService.create(body)
            return res.status(201).json({
                status:201,
                message: "Usuario creado correctamente!"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor!" 
            });
        }
    }
    async userUpdate(req: Request, res: Response){
        try {
            const body = req.body;
            const {id} = req.params;
            await this.userService.update(id,body)
            return res.status(201).json({
                status:201,
                message: "Usuario actualizado con éxito",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor!" 
            });
        }
    }
    async deleteUser(req: Request, res: Response){
        try {
            const {id} = req.params;
            const deleteUser = await this.userService.delete(id)
            return res.status(200).json({
                status:200,
                message: "Usuario eliminado!",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message: error instanceof Error ? error.message : 'Error interno del servidor!'
            });            
        }
    }
}

export default UserCtrl;
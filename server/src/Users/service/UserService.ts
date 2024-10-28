import UserRepository from "../repository/UserRepository";
import { IUser } from "../models/Users";
import bcrypt from "bcrypt";
import { CustomError } from "../../Server/helpers/customError";

class UserService {
  private userRepository: UserRepository = new UserRepository();

  constructor() {}

  async getAllUser() {
    try {
      const users = await this.userRepository.getAll();
      if (!users || users.length === 0) {
        return new CustomError(404, "No se encontraron usuarios");
      }
      return users;
    } catch (error) {
      console.error("Error en getAllUser:", error);
      return new CustomError(
        500,
        "Error interno del servidor al obtener usuarios"
      );
    }
  }

  async getOne(id: string) {
    try {
      const user = await this.userRepository.getOne(id);
      if (!user) {
        return new CustomError(404, "El usuario no existe!");
      }
      return user;
    } catch (error) {
      console.error("Error en getOne:", error);
      return new CustomError(
        error instanceof CustomError ? error.statusCode : 500,
        error instanceof CustomError
          ? error.message
          : "Error al obtener el usuario"
      );
    }
  }

  async create({
    names,
    lastname,
    birthdate,
    address,
    phone,
    username,
    pass,
    mail,
    role,
  }: IUser) {
    try {
      if (!names || !lastname || !birthdate || !username || !pass || !mail) {
        return new CustomError(
          400,
          "Todos los campos requeridos deben estar presentes"
        );
      }
      const salt = await bcrypt.genSalt(10);
      const passHash = bcrypt.hashSync(pass, salt);
      pass = passHash;
      const newUser = await this.userRepository.create(
        names,
        lastname,
        birthdate,
        address,
        phone,
        username,
        pass,
        mail,
        role
      );
      return newUser;
    } catch (error) {
      console.error("Error en create:", error);
      return new CustomError(
        error instanceof CustomError ? error.statusCode : 500,
        error instanceof CustomError
          ? error.message
          : "Error interno del servidor al crear un usuario!"
      );
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = this.userRepository.getOneByUsername(username);
      if (!user) {
        return new CustomError(404, "No se encontró el usuario!");
      }
      return user;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return new CustomError(
        error instanceof CustomError ? error.statusCode : 500,
        error instanceof CustomError
          ? error.message
          : "Error interno del servidor al obtener el usuario!"
      );
    }
  }

  async update(id: string, user: IUser) {
    try {
      const {
        names,
        lastname,
        birthdate,
        username,
        address,
        phone,
        pass,
        mail,
        role,
      } = user;
      if (!names || !lastname || !birthdate || !username || !pass || !mail) {
        return new CustomError(
          400,
          "Todos los campos requeridos deben estar presentes"
        );
      }

      const update = await this.userRepository.updateOne(
        id,
        names,
        lastname,
        birthdate,
        address,
        phone,
        username,
        pass,
        mail,
        role
      );
      return update;
    } catch (error) {
      console.error("Error en update:", error);
      return new CustomError(
        error instanceof CustomError ? error.statusCode : 500,
        error instanceof CustomError
          ? error.message
          : "Error interno del servidor al actualizar el usuario!"
      );
    }
  }

  async delete(id: string) {
    try {
      const userDelete = await this.userRepository.deleteOne(id);
      if (!userDelete) {
        return new CustomError(404, "Usuario no encontrado para eliminar");
      }
      return userDelete;
    } catch (error) {
      console.error("Error en delete:", error);
      return new CustomError(
        error instanceof CustomError ? error.statusCode : 500,
        error instanceof CustomError
          ? error.message
          : "Error interno del servidor al eliminar el usuario!"
      );
    }
  }
}

export default UserService;

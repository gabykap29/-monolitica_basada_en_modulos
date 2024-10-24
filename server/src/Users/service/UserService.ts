import UserRepository from "../repository/UserRepository";
import { IUser } from "../models/Users";

class UserService {
  private userRepository: UserRepository = new UserRepository();
  constructor() {}
  async getAllUser() {
    try {
      const users = await this.userRepository.getAll();
      if (!users || users.length === 0) {
        throw new Error("No se encontraron usuarios");
      }
      return users;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error al obtener usuarios"
      );
    }
  }
  async getOne(id:string){
    try {
        const user = await this.userRepository.getOne(id);
        if (!user) {
            throw new Error("El usuario no existe!");
        }
        return user;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Error al obtener usuarios"
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
        throw new Error("Todos los campos requeridos deben estar presentes");
      }
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
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error interno del servidor al crear un usuario!"
      );
    }
  }
  async update(
    id: string,
    {
      names,
      lastname,
      birthdate,
      address,
      phone,
      username,
      pass,
      mail,
      role,
    }: IUser
  ) {
    try {
      if (!names || !lastname || !birthdate || !username || !pass || !mail) {
        throw new Error("Todos los campos requeridos deben estar presentes");
      }
      const user = await this.userRepository.updateOne(
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
      return user;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error interno del servidor al actualizar el usuario!"
      );
    }
  }
  async delete(id: string){
    try {
        const userDelete = await this.userRepository.deleteOne(id);
        return userDelete;
    } catch (error) {
        throw new Error(
            error instanceof Error
              ? error.message
              : "Error interno del servidor al eliminar el usuario!"
          );
    }
  }
}

export default UserService;
import User from "../models/Users";

class UserRepository {
  constructor() {}
  async getAll() {
    try {
      const users = await User.find();
      if (!users) {
        throw new Error("No hay usuarios cargados!");
      }
      return users; 
    } catch (error) {
      throw new Error("Error al obtener los usuarios de la base de datos");
    }
  }
  async getOne(id: string) {
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
          throw new Error("El usuario no existe!");
        }
        return user;
    } catch (error) {
      throw new Error("Error al obtener el usuario de la base de datos");
    }
  }
  async create(
    names: string,
    lastname: string,
    birthdate: Date,
    address: string,
    phone: number,
    username: string,
    pass: string,
    mail: string,
    role: string
  ) {
   try {
      const newUser = await User.create({
        names: names,
        lastname: lastname,
        birthdate: birthdate,
        address: address,
        phone: phone,
        username: username,
        pass: pass,
        mail: mail,
        role: role,
      });
      if (!newUser) {
        throw new Error("Error al crear el usuario, verifique los campos!");
      }
      return newUser;
   } catch (error) {
      throw new Error("Error al crear el usuario!");
   }
  }

  async updateOne(
    id: string,
    names: string,
    lastname: string,
    birthdate: Date,
    address: string,
    phone: number,
    username: string,
    pass: string,
    mail: string,
    role: string
  ) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: id }, // Filtro por id
        {
          $set: {
            names: names,
            lastname: lastname,
            birthdate: birthdate,
            address: address,
            phone: phone,
            username: username,
            pass: pass,
            mail: mail,
            role: role,
          },
        },
        { new: true } // Esto devolverá el documento actualizado
      );
      if(!user){
        throw new Error("Error al actualizar el usuario, verifique los campos!");
      }
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error al actualizar el usuario!");
    }
    
  }
  async deleteOne(id: string){
    try {
      const user = await User.findOneAndDelete({_id: id});
      if(!user){
        throw new Error("No se encontró el usuario!")
      }
      return user;
    } catch (error) {
      throw new Error("Error al eliminar el usuario en la base de datos!");
    }

  }
  
}

export default UserRepository;
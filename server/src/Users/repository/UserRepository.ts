import User from "../models/Users";

class UserRepository {
  constructor() {}

  async getAll() {
    try {
      const users = await User.find();
      if (!users) {
        return false;
      }
      return users;
    } catch (error) {
      console.error("Error en getAll:", error); // Agrega el log de error
      return false;
    }
  }

  async getOne(id: string) {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return false;
      }
      return user;
    } catch (error) {
      console.error("Error en getOne:", error); // Agrega el log de error
      return false;
    }
  }

  async getOneByUsername(username: string) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return false;
      }
      return user;
    } catch (error) {
      console.error(error);
      return false;
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
        return false;
      }
      return newUser;
    } catch (error) {
      console.error("Error en create:", error); // Agrega el log de error
      return false;
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
      if (!user) {
        return false;
      }
      await user.save();
      return user;
    } catch (error) {
      console.error("Error en updateOne:", error); // Agrega el log de error
      return false;
    }
  }

  async deleteOne(id: string) {
    try {
      const user = await User.findOneAndDelete({ _id: id });
      if (!user) {
        return false;
      }
      return user;
    } catch (error) {
      console.error("Error en deleteOne:", error); // Agrega el log de error
      return false;
    }
  }
}

export default UserRepository;

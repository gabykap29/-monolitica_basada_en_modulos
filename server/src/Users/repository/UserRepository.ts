import User from "../models/Users";

class UserRepository {
  constructor() {}
  async getAll() {
    const users = await User.find();
    if (!users) {
      return false;
    }
    return users;
  }
  async getOne(id: string) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return false;
    }
    return user;
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
  
    return user;
  }
  async deleteOne(id: string){
    const user = await User.findOneAndDelete({_id: id});
    if(!user){
        return false;
    }
    return user;
  }
  
}

export default UserRepository;
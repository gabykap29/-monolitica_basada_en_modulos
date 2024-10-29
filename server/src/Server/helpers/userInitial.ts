import UserService from '../../Users/service/UserService';
import { Role } from '../../Users/models/Users';
import { CustomError } from './customError';

const userService = new UserService();

export const userInitial = async () => {
  try {
    const users = await userService.getAllUser();
    if (users instanceof CustomError) {
      const admin = {
        names: 'initial',
        lastname: 'User',
        birthdate: new Date('1990-01-01'),
        address: 'address default',
        dni: 88888888,
        phone: 123,
        username: 'admin',
        pass: '1234',
        mail: 'admin@example.com',
        role: Role.Admin,
      };

      const userAdmin = await userService.create({
        ...admin,
      });
      if (userAdmin instanceof CustomError) {
        console.error('Error al crear el usuario inicial!', userAdmin);
        return;
      }
      console.log('Usuario inicial creado con éxito!');
    } else {
      console.log('Usuario Inicial ya existente!');
    }
  } catch (error) {
    console.error(error);
  }
};

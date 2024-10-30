import UserRepository from '../../Users/repository/UserRepository';
import { CustomError } from '../../Server/helpers/customError';
import bcript from 'bcrypt';
import { generateToken } from '../helpers/jwt';

class AuthService {
  private userRepository: UserRepository = new UserRepository();
  constructor() {}
  async login(username: string, pass: string) {
    try {
      const user = await this.userRepository.getOneByUsername(username);
      if (!user) {
        return new CustomError(
          404,
          'No se encontraron usuarios con las credenciales provistas!',
        );
      }
      const passValid = bcript.compareSync(pass, user.pass);
      if (!passValid) {
        return new CustomError(
          404,
          'No se encontraron usuarios con las credenciales provistas!',
        );
      }
      const token = generateToken({ id: user._id, role: user.role });
      const dataUser = {
        nameComplete: `${user.names} ${user.lastname}`,
        username: user.username,
        role: user.role,
      };
      return { token, dataUser };
    } catch (error) {
      console.error('Error al intentar inciar sesión:', error);
      return new CustomError(
        500,
        'Error interno del servidor al intentar iniciar sesión',
      );
    }
  }
}

export default AuthService;

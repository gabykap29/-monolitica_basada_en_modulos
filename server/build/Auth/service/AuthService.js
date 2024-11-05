"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../../Users/repository/UserRepository"));
const customError_1 = require("../../Server/helpers/customError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../helpers/jwt");
class AuthService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    login(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.getOneByUsername(username);
                if (!user) {
                    return new customError_1.CustomError(404, 'No se encontraron usuarios con las credenciales provistas!');
                }
                const passValid = bcrypt_1.default.compareSync(pass, user.pass);
                if (!passValid) {
                    return new customError_1.CustomError(404, 'No se encontraron usuarios con las credenciales provistas!');
                }
                const token = (0, jwt_1.generateToken)({
                    id: user._id,
                    role: user.role,
                    username: user.username,
                });
                const dataUser = {
                    nameComplete: `${user.names} ${user.lastname}`,
                    username: user.username,
                    role: user.role,
                };
                return { token, dataUser };
            }
            catch (error) {
                console.error('Error al intentar inciar sesión:', error);
                return new customError_1.CustomError(500, 'Error interno del servidor al intentar iniciar sesión');
            }
        });
    }
}
exports.default = AuthService;

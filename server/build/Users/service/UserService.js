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
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customError_1 = require("../../Server/helpers/customError");
class UserService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    getAllUser(typeUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.getAll(typeUser);
                if (!users || users.length === 0) {
                    return new customError_1.CustomError(404, 'No se encontraron usuarios');
                }
                return users;
            }
            catch (error) {
                console.error('Error en getAllUser:', error);
                return new customError_1.CustomError(500, 'Error interno del servidor al obtener usuarios');
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.getOne(id);
                if (!user) {
                    return new customError_1.CustomError(404, 'El usuario no existe!');
                }
                return user;
            }
            catch (error) {
                console.error('Error en getOne:', error);
                return new customError_1.CustomError(error instanceof customError_1.CustomError ? error.statusCode : 500, error instanceof customError_1.CustomError
                    ? error.message
                    : 'Error al obtener el usuario');
            }
        });
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ names, lastname, birthdate, address, dni, phone, username, pass, mail, role, }) {
            try {
                if (!names ||
                    !address ||
                    !lastname ||
                    !birthdate ||
                    !dni ||
                    !username ||
                    !pass ||
                    !mail ||
                    !phone ||
                    !role) {
                    return new customError_1.CustomError(400, 'Todos los campos requeridos deben estar presentes');
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const passHash = bcrypt_1.default.hashSync(pass, salt);
                pass = passHash;
                const newUser = yield this.userRepository.create(names, lastname, birthdate, address, dni, phone, username, pass, mail, role);
                return newUser;
            }
            catch (error) {
                console.error('Error en create:', error);
                return new customError_1.CustomError(error instanceof customError_1.CustomError ? error.statusCode : 500, error instanceof customError_1.CustomError
                    ? error.message
                    : 'Error interno del servidor al crear un usuario!');
            }
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.userRepository.getOneByUsername(username);
                if (!user) {
                    return new customError_1.CustomError(404, 'No se encontró el usuario!');
                }
                return user;
            }
            catch (error) {
                console.error('Error al obtener el usuario:', error);
                return new customError_1.CustomError(error instanceof customError_1.CustomError ? error.statusCode : 500, error instanceof customError_1.CustomError
                    ? error.message
                    : 'Error interno del servidor al obtener el usuario!');
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { names, lastname, birthdate, username, address, dni, phone, pass, mail, role, } = user;
                if (!names || !lastname || !birthdate || !username || !pass || !mail) {
                    return new customError_1.CustomError(400, 'Todos los campos requeridos deben estar presentes');
                }
                const update = yield this.userRepository.updateOne(id, names, lastname, birthdate, address, dni, phone, username, pass, mail, role);
                return update;
            }
            catch (error) {
                console.error('Error en update:', error);
                return new customError_1.CustomError(error instanceof customError_1.CustomError ? error.statusCode : 500, error instanceof customError_1.CustomError
                    ? error.message
                    : 'Error interno del servidor al actualizar el usuario!');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDelete = yield this.userRepository.deleteOne(id);
                if (!userDelete) {
                    return new customError_1.CustomError(404, 'Usuario no encontrado para eliminar');
                }
                return userDelete;
            }
            catch (error) {
                console.error('Error en delete:', error);
                return new customError_1.CustomError(error instanceof customError_1.CustomError ? error.statusCode : 500, error instanceof customError_1.CustomError
                    ? error.message
                    : 'Error interno del servidor al eliminar el usuario!');
            }
        });
    }
}
exports.default = UserService;

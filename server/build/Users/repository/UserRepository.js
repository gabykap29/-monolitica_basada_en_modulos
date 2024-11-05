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
const Users_1 = __importDefault(require("../models/Users"));
class UserRepository {
    constructor() { }
    getAll(typeUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield Users_1.default.find({
                    role: typeUser,
                });
                if (!users) {
                    return false;
                }
                return users;
            }
            catch (error) {
                console.error('Error en getAll:', error); // Agrega el log de error
                return false;
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_1.default.findOne({ _id: id });
                if (!user) {
                    return false;
                }
                return user;
            }
            catch (error) {
                console.error('Error en getOne:', error); // Agrega el log de error
                return false;
            }
        });
    }
    getOneByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_1.default.findOne({ username: username });
                if (!user) {
                    return false;
                }
                return user;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    create(names, lastname, birthdate, address, dni, phone, username, pass, mail, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield Users_1.default.create({
                    names: names,
                    lastname: lastname,
                    birthdate: birthdate,
                    address: address,
                    dni: dni,
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
            catch (error) {
                console.error('Error en create:', error); // Agrega el log de error
                return false;
            }
        });
    }
    updateOne(id, names, lastname, birthdate, address, dni, phone, username, pass, mail, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_1.default.findOneAndUpdate({ _id: id }, // Filtro por id
                {
                    $set: {
                        names: names,
                        lastname: lastname,
                        birthdate: birthdate,
                        address: address,
                        dni: dni,
                        phone: phone,
                        username: username,
                        pass: pass,
                        mail: mail,
                        role: role,
                    },
                }, { new: true });
                if (!user) {
                    return false;
                }
                yield user.save();
                return user;
            }
            catch (error) {
                console.error('Error en updateOne:', error); // Agrega el log de error
                return false;
            }
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_1.default.findOneAndDelete({ _id: id });
                if (!user) {
                    return false;
                }
                return user;
            }
            catch (error) {
                console.error('Error en deleteOne:', error); // Agrega el log de error
                return false;
            }
        });
    }
}
exports.default = UserRepository;

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
exports.userInitial = void 0;
const UserService_1 = __importDefault(require("../../Users/service/UserService"));
const Users_1 = require("../../Users/models/Users");
const customError_1 = require("./customError");
const userService = new UserService_1.default();
const userInitial = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUser('admin');
        if (users instanceof customError_1.CustomError) {
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
                role: Users_1.Role.Admin,
            };
            const userAdmin = yield userService.create(Object.assign({}, admin));
            if (userAdmin instanceof customError_1.CustomError) {
                console.error('Error al crear el usuario inicial!', userAdmin);
                return;
            }
            console.log('Usuario inicial creado con éxito!');
        }
        else {
            console.log('Usuario Inicial ya existente!');
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.userInitial = userInitial;

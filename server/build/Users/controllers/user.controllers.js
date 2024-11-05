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
const UserService_1 = __importDefault(require("../service/UserService"));
const customError_1 = require("../../Server/helpers/customError");
class UserCtrl {
    constructor() {
        this.userService = new UserService_1.default();
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { typeUser } = req.params;
                if (!typeUser) {
                    const err = new customError_1.CustomError(400, 'El tipo de usuario es requerido!');
                    res.status(err.statusCode).json({
                        status: err.statusCode,
                        message: err.message,
                    });
                }
                const users = yield this.userService.getAllUser(typeUser);
                if (users instanceof customError_1.CustomError) {
                    console.error('Error en getUsers:', users);
                    res.status(users.statusCode).json(users);
                    return;
                }
                res.status(200).json({
                    status: 200,
                    users: users,
                });
            }
            catch (error) {
                const err = new customError_1.CustomError(500, 'Error interno del servidor');
                console.error('Error en getUsers:', error);
                res.status(err.statusCode).json(err);
                return;
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userService.getOne(id);
                if (user instanceof customError_1.CustomError) {
                    console.error('Error en getUser:', user);
                    res.status(user.statusCode).json(user);
                    return;
                }
                res.status(200).json({
                    status: 200,
                    user: user,
                });
            }
            catch (error) {
                const err = new customError_1.CustomError(500, 'Error interno del servidor');
                console.error('Error en getUser:', error);
                res.status(err.statusCode).json(err);
                return;
            }
        });
    }
    userCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const creationResult = yield this.userService.create(body);
                if (creationResult instanceof customError_1.CustomError) {
                    console.error('Error en getUser:', creationResult);
                    res.status(creationResult.statusCode).json(creationResult);
                    return;
                }
                res.status(201).json({
                    status: 201,
                    message: 'Usuario creado correctamente!',
                    user: creationResult
                });
            }
            catch (error) {
                const err = new customError_1.CustomError(500, 'Error interno del servidor');
                console.error('Error en userCreate:', error);
                res.status(err.statusCode).json(err);
                return;
            }
        });
    }
    userUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const updateResult = yield this.userService.update(id, body);
                if (updateResult instanceof customError_1.CustomError) {
                    console.error('Error en userUpdate:', updateResult);
                    res.status(updateResult.statusCode).json(updateResult);
                    return;
                }
                res.status(200).json({
                    status: 200,
                    message: 'Usuario actualizado con éxito!',
                    user: updateResult
                });
            }
            catch (error) {
                const err = new customError_1.CustomError(500, 'Error interno del servidor');
                console.error('Error en userUpdate:', error);
                res.status(err.statusCode).json(err);
                return;
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletionResult = yield this.userService.delete(id);
                if (deletionResult instanceof customError_1.CustomError) {
                    console.error('Error en deleteUser:', deletionResult);
                    res.status(deletionResult.statusCode).json(deletionResult);
                    return;
                }
                res.status(200).json({
                    status: 200,
                    message: 'Usuario eliminado correctamente!',
                });
            }
            catch (error) {
                const err = new customError_1.CustomError(500, 'Error interno del servidor');
                console.error('Error en deleteUser:', error);
                res.status(err.statusCode).json(err);
                return;
            }
        });
    }
}
exports.default = UserCtrl;

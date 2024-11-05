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
const AuthService_1 = __importDefault(require("../service/AuthService"));
const customError_1 = require("../../Server/helpers/customError");
class AuthCtrl {
    constructor() {
        this.authService = new AuthService_1.default();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, pass } = req.body;
                if (!username && !pass) {
                    const err = new customError_1.CustomError(400, 'El username y la contraeña son requeridos!');
                    res.status(err.statusCode).json({
                        status: err.statusCode,
                        message: err.message,
                    });
                }
                const userLogin = yield this.authService.login(username, pass);
                if (userLogin instanceof customError_1.CustomError) {
                    console.error('Error en getUser:', userLogin);
                    res.status(userLogin.statusCode).json(userLogin);
                    return;
                }
                const { token, dataUser } = userLogin;
                res.status(200).json({
                    status: 200,
                    message: 'Inciió sesión correctamente!',
                    token: token,
                    dataUser: dataUser,
                });
            }
            catch (error) {
                const err = new customError_1.CustomError(500, 'Error interno del servidor al iniciar sesión');
                console.error('Error en getUser:', error);
                res.status(err.statusCode).json(err);
                return;
            }
        });
    }
}
exports.default = AuthCtrl;

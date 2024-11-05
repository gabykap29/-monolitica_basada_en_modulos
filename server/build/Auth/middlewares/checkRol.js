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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRolPreceptor = exports.checkRolStudent = exports.checkRolAdmin = void 0;
const jwt_1 = require("../helpers/jwt");
const customError_1 = require("../../Server/helpers/customError");
const extractRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return false;
        }
        const decode = yield (0, jwt_1.decodeToken)(header);
        if (!decode) {
            return false;
        }
        return decode;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
const checkRolAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield extractRole(req, res);
        if (decoded && decoded.role === 'admin') {
            // Si el usuario tiene rol "admin", pasa al siguiente middleware
            return next();
        }
        else {
            // Si no tiene rol "admin", responde con error de autorización
            throw new customError_1.CustomError(401, 'No autorizado!');
        }
    }
    catch (error) {
        const statusCode = error instanceof customError_1.CustomError ? error.statusCode : 500;
        res.status(statusCode).json({
            status: statusCode,
            message: error instanceof customError_1.CustomError ? error.message : 'Error en el servidor',
        });
    }
});
exports.checkRolAdmin = checkRolAdmin;
const checkRolStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield extractRole(req, res);
        if (decoded && decoded.role === 'student') {
            // Si el usuario tiene rol "admin", pasa al siguiente middleware
            return next();
        }
        else {
            // Si no tiene rol "admin", responde con error de autorización
            throw new customError_1.CustomError(401, 'No autorizado!');
        }
    }
    catch (error) {
        const statusCode = error instanceof customError_1.CustomError ? error.statusCode : 500;
        res.status(statusCode).json({
            status: statusCode,
            message: error instanceof customError_1.CustomError ? error.message : 'Error en el servidor',
        });
    }
});
exports.checkRolStudent = checkRolStudent;
const checkRolPreceptor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield extractRole(req, res);
        if (decoded && decoded.role === 'preceptor') {
            // Si el usuario tiene rol "admin", pasa al siguiente middleware
            return next();
        }
        else {
            // Si no tiene rol "admin", responde con error de autorización
            throw new customError_1.CustomError(401, 'No autorizado!');
        }
    }
    catch (error) {
        const statusCode = error instanceof customError_1.CustomError ? error.statusCode : 500;
        res.status(statusCode).json({
            status: statusCode,
            message: error instanceof customError_1.CustomError ? error.message : 'Error en el servidor',
        });
    }
});
exports.checkRolPreceptor = checkRolPreceptor;

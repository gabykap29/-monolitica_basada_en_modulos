"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.secretJWT, {
        expiresIn: '1d',
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.secretJWT);
};
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || typeof decoded === 'string') {
            return false;
        }
        const { id, role, username } = decoded;
        if (typeof id === 'string' &&
            typeof role === 'string' &&
            typeof username === 'string') {
            return { id, role, username };
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.decodeToken = decodeToken;

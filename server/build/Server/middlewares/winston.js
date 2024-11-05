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
exports.loggerMiddleware = void 0;
const winston_1 = __importDefault(require("winston"));
const jwt_1 = require("../../Auth/helpers/jwt");
function extractUsername(header) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!header) {
            return 'No logged';
        }
        const user = (0, jwt_1.decodeToken)(header);
        if (user === false || user === true) {
            return 'No logged';
        }
        return user.username;
    });
}
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.File({ filename: './src/Aud/error/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: './src/Aud/logs/combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
// Middleware de registro
const loggerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extrae el nombre de usuario desde el header
    const header = req.headers.authorization || '';
    const username = yield extractUsername(header);
    // Crea un objeto log con propiedades separadas
    const logData = {
        usuario: username,
        cliente: req.ip || req.headers['x-forwarded-for'],
        metodo: req.method,
        url: req.url,
        estado: res.statusCode,
    };
    // Registra cada campo en el objeto
    logger.info(logData);
    next();
});
exports.loggerMiddleware = loggerMiddleware;
exports.default = logger;

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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class AuditCtrl {
    getLogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const logType = req.params.logType || 'combined';
                const logFilePath = path_1.default.join(__dirname, `../logs/${logType}.log`);
                if (!fs_1.default.existsSync(logFilePath)) {
                    res.status(404).json({ message: 'El archivo de logs no existe' });
                    return;
                }
                const logs = fs_1.default.readFileSync(logFilePath, 'utf-8');
                const logEntries = logs.split('\n').filter(Boolean).map(line => JSON.parse(line));
                res.status(200).json({ status: 200, logs: logEntries });
            }
            catch (error) {
                console.error('Error al obtener los logs:', error);
                res.status(500).json({ message: 'Error interno al obtener los logs' });
            }
        });
    }
}
exports.default = AuditCtrl;

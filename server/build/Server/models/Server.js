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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../../database/db");
const routerTest_1 = __importDefault(require("../routes/routerTest"));
const config_1 = require("../config/config");
const users_routes_1 = __importDefault(require("../../Users/routes/users.routes"));
const auth_routes_1 = __importDefault(require("../../Auth/routes/auth.routes"));
const Attendance_routes_1 = __importDefault(require("../../Attendance/router/Attendance.routes"));
const reports_route_1 = __importDefault(require("../../Reports/routes/reports.route"));
const dayjs_1 = __importDefault(require("dayjs"));
const node_cron_1 = __importDefault(require("node-cron"));
const Attendance_services_1 = require("../../Attendance/service/Attendance.services");
const winston_1 = require("../middlewares/winston");
const path_1 = __importDefault(require("path"));
const audit_routes_1 = __importDefault(require("../../Aud/routes/audit.routes"));
const attendanceService = new Attendance_services_1.AttendanceService();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(config_1.PORT);
        this.dbConnect();
        this.middlewares();
        this.routes();
        this.serveFrontend();
        this.scheduleTasks();
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.db.connect();
        });
    }
    middlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use((0, cors_1.default)());
            this.app.use(winston_1.loggerMiddleware);
        });
    }
    routes() {
        this.app.use(routerTest_1.default);
        this.app.use('/api/', users_routes_1.default);
        this.app.use('/api/', auth_routes_1.default);
        this.app.use('/api/', Attendance_routes_1.default);
        this.app.use('/reports', express_1.default.static(path_1.default.join(__dirname, 'Reports/Docs')));
        this.app.use('/api/', audit_routes_1.default);
        this.app.use('/api', reports_route_1.default);
    }
    serveFrontend() {
        // Middleware para servir la carpeta 'dist' de Vite
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../dist')));
        // Ruta de fallback para cualquier ruta que no sea manejada por el backend
        this.app.get('*', (_req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../../dist', 'index.html'));
        });
    }
    scheduleTasks() {
        node_cron_1.default.schedule('15 9 * * *', () => __awaiter(this, void 0, void 0, function* () {
            const dayOfWeek = (0, dayjs_1.default)().day(); // 0 = Domingo, 6 = Sábado
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Verifica que no sea sábado ni domingo
                console.log('Ejecutando la tarea de marcar ausentes a las 9:15 AM');
                try {
                    yield attendanceService.markAbsent();
                }
                catch (error) {
                    console.error('Error al registrar ausentes:', error);
                }
            }
            else {
                console.log('No se ejecuta la tarea de marcar ausentes los fines de semana');
            }
        }));
    }
    listen() {
        this.app.listen(this.port, '0.0.0.0', () => __awaiter(this, void 0, void 0, function* () {
            console.log('Servidor funcionando en el puerto: ' + this.port);
        }));
    }
}
exports.default = Server;

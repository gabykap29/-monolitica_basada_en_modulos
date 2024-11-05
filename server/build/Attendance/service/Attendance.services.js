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
exports.AttendanceService = void 0;
const Attendance_repository_1 = require("../repository/Attendance.repository");
const UserService_1 = __importDefault(require("../../Users/service/UserService"));
const customError_1 = require("../../Server/helpers/customError");
const dayjs_1 = __importDefault(require("dayjs"));
const jwt_1 = require("../../Auth/helpers/jwt");
const userService = new UserService_1.default();
class AttendanceService {
    constructor() {
        this.AttendanceRepository = new Attendance_repository_1.AttendanceRepository();
    }
    markAttendance(attendanceData, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const horaActual = (0, dayjs_1.default)();
                const limiteHora = (0, dayjs_1.default)().hour(9).minute(15);
                console.log("TOKEN" + token);
                if (typeof token === "string") {
                    const userInfo = (0, jwt_1.decodeToken)(token);
                    if (typeof userInfo !== "boolean") {
                        if (userInfo.role === "student") {
                            if (horaActual.isBefore(limiteHora)) {
                                const attendance = yield this.AttendanceRepository.create({ idStudent: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id, isPresent: attendanceData.isPresent });
                                return attendance && { status: true, message: "Asistencia creada correctamete" };
                            }
                            else {
                                return {
                                    status: false, message: "Ya a pasado la fecha limite para marcar la asistencia, las " + limiteHora.format('HH:mm A')
                                };
                            }
                        }
                        else {
                            const attendance = yield this.AttendanceRepository.create({ idStudent: attendanceData.idStudent, isPresent: attendanceData.isPresent });
                            return attendance && { status: true, message: "Asistencia creada correctamete" };
                        }
                    }
                    else {
                        throw new Error("Token invalido");
                    }
                }
                else {
                    throw new Error("No hay token en la petición");
                }
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al marcar la asistencia del estudiante");
            }
        });
    }
    findAllByDate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date }) {
            try {
                console.log(date);
                const attendances = yield this.AttendanceRepository.findAllByDate(date);
                return attendances;
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante en esa fecha");
            }
        });
    }
    findOneAttendance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceRepository.findId(id);
                return attendances;
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante.");
            }
        });
    }
    findAttendancesByUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = (0, jwt_1.decodeToken)(token);
                const attendances = yield this.AttendanceRepository.findAllByStudent(idUser.id);
                return attendances;
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante");
            }
        });
    }
    findAttendancesByUserParams(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                const attendances = yield this.AttendanceRepository.findAllByStudent(id);
                return attendances;
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante");
            }
        });
    }
    findAttendancesGroupedByDate(month) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceRepository.findAllAgrupedByDate(month);
                console.log(attendances);
                if (typeof attendances !== "boolean") {
                    const formatedAttendances = attendances.map((attendance) => ({
                        id: attendance._id,
                        idStudent: attendance.idStudent,
                        start: attendance.createdAt,
                        end: attendance.createdAt,
                        title: attendance.isPresent
                    }));
                    return formatedAttendances;
                }
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante");
            }
        });
    }
    deleteAttendance(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceRepository.delete(idUser);
                return attendances;
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al eliminar asistencia del estudiante");
            }
        });
    }
    updateAttendance(idAttendance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceRepository.update(idAttendance);
                return attendances;
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al actualizar la asistencia del estudiante");
            }
        });
    }
    markAbsent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todayDate = (0, dayjs_1.default)().format('YYYY-MM-DD');
                const students = yield userService.getAllUser("student");
                const presentStudents = yield this.findAllByDate({ date: todayDate });
                if (typeof presentStudents !== 'boolean' && !(students instanceof customError_1.CustomError)) {
                    const absentStudents = students.filter(student => {
                        const isAbsent = !presentStudents.some(present => {
                            var _a;
                            if (typeof present.idStudent === 'object') {
                                // console.log("Comparando:", { presentId: present.idStudent._id, _id: String(student._id) });
                                return ((_a = present === null || present === void 0 ? void 0 : present.idStudent) === null || _a === void 0 ? void 0 : _a._id.toString()) === String(student._id);
                            }
                        });
                        return isAbsent;
                    });
                    for (const absent of absentStudents) {
                        const attendance = yield this.AttendanceRepository.create({ idStudent: String(absent._id), isPresent: false });
                    }
                    return { presentLength: presentStudents.length, absentLength: absentStudents.length, sudentsLength: students.length };
                }
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message : "Error al marcar ausentes de estudiantes");
            }
        });
    }
}
exports.AttendanceService = AttendanceService;

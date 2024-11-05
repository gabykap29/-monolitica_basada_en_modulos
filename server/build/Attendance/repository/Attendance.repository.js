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
exports.AttendanceRepository = void 0;
const Attendance_1 = require("../model/Attendance");
class AttendanceRepository {
    constructor() { }
    findId(IdAttendance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield Attendance_1.Attendance.findById(IdAttendance);
                if (!attendance) {
                    return false;
                }
                return attendance;
            }
            catch (error) {
                throw new Error("Error al buscar la asistencia del estudiante");
            }
        });
    }
    findAllByStudent(idStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield Attendance_1.Attendance.find({ idStudent: idStudent }).populate('idStudent', 'names lastname');
                console.log(attendance);
                if (!attendance) {
                    return false;
                }
                return attendance;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al buscar las asistencias del estudiante");
            }
        });
    }
    findAllAgrupedByDate(month) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca asistencias dentro del rango de fechas
                const attendance = yield Attendance_1.Attendance.find().populate('idStudent', 'names lastname');
                // Verifica si se encontraron resultados
                if (!attendance || attendance.length === 0) {
                    return false;
                }
                return attendance;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al buscar las asistencias del estudiante");
            }
        });
    }
    findAllByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield Attendance_1.Attendance.find({
                    $expr: {
                        $eq: [
                            { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                            date
                        ]
                    }
                }).populate('idStudent', 'names lastname');
                if (!attendance || attendance.length === 0) {
                    return [];
                }
                return attendance;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al buscar las asistencias del estudiante por fecha");
            }
        });
    }
    create(attendance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAttendance = yield Attendance_1.Attendance.create(attendance);
                console.log(newAttendance);
                return newAttendance;
            }
            catch (error) {
                console.log(error);
                throw new Error(error instanceof Error ? error.message.includes("duplicate key") ? "La asistencia ya esta marcada para el dia de hoy" : "Error al crear una asistencia" : "Error al crear una asistencia");
            }
        });
    }
    update(idAttendance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldAttendance = yield this.findId(idAttendance);
                if (typeof oldAttendance !== "boolean") {
                    const updatedAttendance = yield Attendance_1.Attendance.findByIdAndUpdate(idAttendance, { isPresent: !oldAttendance.isPresent }, { new: true });
                    return updatedAttendance ? true : false;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al actualizar una asistencia");
            }
        });
    }
    delete(IdAttendance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield Attendance_1.Attendance.findByIdAndDelete(IdAttendance);
                if (!attendance) {
                    return false;
                }
                return true;
            }
            catch (error) {
                throw new Error("Error al eliminar una asistencia");
            }
        });
    }
}
exports.AttendanceRepository = AttendanceRepository;

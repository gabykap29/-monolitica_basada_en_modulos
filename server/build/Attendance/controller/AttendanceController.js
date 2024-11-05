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
exports.AttendanceController = void 0;
const Attendance_services_1 = require("../service/Attendance.services");
class AttendanceController {
    constructor() {
        this.AttendanceService = new Attendance_services_1.AttendanceService();
        this.createAttendance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.AttendanceService.markAttendance(req.body, req.headers.authorization);
                res.status(attendance.status === true ? 200 : 401).json({
                    status: attendance.status === true ? 200 : 401,
                    attendance: attendance.message
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.createAbsent = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.AttendanceService.markAbsent();
                res.status(200).json({
                    status: 200,
                    attendance: attendance
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.getAttendanceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.AttendanceService.findOneAttendance(req.params.attendance);
                res.status(200).json({
                    status: 200,
                    attendance: attendance
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.getAttendancesByDate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceService.findAllByDate(req.body);
                console.log(attendances);
                res.status(200).json({
                    status: 200,
                    attendances: attendances
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.getAttendancesByMonth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceService.findAttendancesGroupedByDate(req.params.month);
                res.status(200).json({
                    status: 200,
                    attendances: attendances
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.getAllAttendancesByUserParams = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceService.findAttendancesByUserParams(req.params.id);
                res.status(200).json({
                    status: 200,
                    attendances: attendances
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.getAllAttendancesByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendances = yield this.AttendanceService.findAttendancesByUser(req.headers.authorization);
                res.status(200).json({
                    status: 200,
                    attendances: attendances
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.updateAttendance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.AttendanceService.updateAttendance(req.params.id);
                res.status(200).json({
                    status: 200,
                    attendance: attendance
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
        this.deleteAttendance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.AttendanceService.deleteAttendance(req.params.id);
                res.status(200).json({
                    status: 200,
                    attendance: attendance
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    status: 500,
                    message: error instanceof Error ? error.message : "Error interno del servidor"
                });
            }
        });
    }
}
exports.AttendanceController = AttendanceController;

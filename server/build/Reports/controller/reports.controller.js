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
const reports_service_1 = require("./../service/reports.service");
const path_1 = __importDefault(require("path"));
class ReportsController {
    constructor() {
        this.createReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, typeReport } = req.body;
                if (!studentId || !typeReport) {
                    res.status(400).json({ message: 'Faltan datos requeridos' });
                    return;
                }
                const newReport = yield this.reportsService.generateReport(studentId, typeReport);
                res.status(201).json(newReport);
            }
            catch (error) {
                console.error('Error al generar el reporte:', error);
                res.status(500).json({ message: 'Error al generar el reporte', error: error instanceof Error ? error.message : error });
            }
        });
        this.deleteReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedReport = yield this.reportsService.deleteReport(id);
                if (!deletedReport) {
                    res.status(404).json({ message: 'Reporte no encontrado' });
                }
                res.status(200).json({ message: 'Reporte eliminado correctamente', deletedReport });
            }
            catch (error) {
                console.error('Error al eliminar el reporte:', error);
                res.status(500).json({ message: 'Error al eliminar el reporte', error: error instanceof Error ? error.message : error });
            }
        });
        this.getAllReports = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield this.reportsService.getAllReports();
                res.status(200).json(reports);
            }
            catch (error) {
                console.error('Error al obtener los reportes:', error);
                res.status(500).json({ message: 'Error al obtener los reportes', error: error instanceof Error ? error.message : error });
            }
        });
        this.getReportById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const report = yield this.reportsService.getReportById(id);
                if (!report) {
                    res.status(404).json({ message: 'Reporte no encontrado' });
                }
                res.status(200).json(report);
            }
            catch (error) {
                console.error('Error al obtener el reporte:', error);
                res.status(500).json({ message: 'Error al obtener el reporte', error: error instanceof Error ? error.message : error });
            }
        });
        this.getPDFByName = (req, res) => {
            try {
                const { filename } = req.params;
                const filePath = path_1.default.join(__dirname, '../../Reports/Docs', filename);
                res.download(filePath, (err) => {
                    if (err) {
                        console.error('Error al enviar el archivo:', err);
                        res.status(404).json({ message: 'Reporte PDF no encontrado' });
                    }
                });
            }
            catch (error) {
                console.error('Error al obtener el contenido del reporte PDF:', error);
                res.status(500).json({ message: 'Error al obtener el contenido del reporte PDF', error: error instanceof Error ? error.message : error });
            }
        };
        this.reportsService = new reports_service_1.ReportsService();
    }
}
exports.default = new ReportsController();

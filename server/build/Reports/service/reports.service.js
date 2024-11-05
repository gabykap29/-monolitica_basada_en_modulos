"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ReportsService = void 0;
const reports_model_1 = __importStar(require("./../model/reports.model"));
const Users_1 = __importStar(require("../../Users/models/Users"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ReportsService {
    generateReport(studentId, typeReport) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar al estudiante en la colección de usuarios
            const student = yield Users_1.default.findOne({ _id: studentId, role: Users_1.Role.Student });
            if (!student) {
                throw new Error('Estudiante no encontrado');
            }
            let details = '';
            if (typeReport === reports_model_1.TypeReport.FreeinMatter) {
                details = `Por medio de la presente, le informamos que, debido al número de inasistencias registradas en el cuatrimestre actual, ha quedado en condición de alumno libre en las materias que corresponden a su plan de estudios. La normativa vigente establece que para mantener la regularidad es necesario cumplir con al menos un 80% de asistencia en cada materia.

Lamentablemente, su registro de asistencias ha reflejado un número de inasistencias injustificadas que supera el margen permitido para mantener dicha condición. En consecuencia, esta situación lo inhabilita para participar en las actividades regulares y evaluaciones continuas del presente cuatrimestre en las asignaturas afectadas.

Como alumno en condición de "libre", podrá acceder a la instancia de evaluación final de cada asignatura según los requisitos y calendario del cuatrimestre, pero no podrá participar en las clases ni en las evaluaciones parciales. Le recomendamos revisar el reglamento de asistencia de la institución para conocer más detalles sobre sus opciones en esta modalidad y acercarse a los preceptores en caso de necesitar asesoría adicional.`;
            }
            else if (typeReport === reports_model_1.TypeReport.FaultNotice) {
                details = `Me dirijo a Ud. para informarle que en el registro de asistencias de la carrera se han consignado inasistencias injustificadas en las materias correspondientes a su plan de estudios. Desde el inicio de clases hasta el día de la fecha, se han contabilizado varias ausencias que exceden el límite permitido para conservar la regularidad. Le recordamos que, según el reglamento institucional, uno de los requisitos fundamentales para mantener el estado de alumno regular es que el porcentaje de asistencia sea, como mínimo, del 80%.

Es nuestro deber resaltar que el incumplimiento de este criterio afecta su continuidad en el presente cuatrimestre. La institución considera la asistencia una condición esencial no solo para garantizar su progreso académico, sino también para cumplir con los lineamientos que permiten un aprendizaje continuo y efectivo. De este modo, cualquier ausencia adicional que no esté debidamente justificada podría derivar en la pérdida de su regularidad, con el consecuente pase a condición de alumno libre.

Con la presente notificación, y con el compromiso de apoyarlo en el cumplimiento de sus objetivos académicos, le instamos a tomar las medidas pertinentes para evitar incurrir en nuevas inasistencias injustificadas durante el resto del cuatrimestre. Si necesita orientación o si existen circunstancias excepcionales que puedan estar afectando su asistencia, le recomendamos ponerse en contacto con los preceptores de su área o con la oficina de asistencia estudiantil.`;
            }
            const pdfFilename = `${student.names} ${student.lastname}_${typeReport}.pdf`;
            yield this.createReportPDF(`${student.names} ${student.lastname}`, typeReport, details);
            const newReport = new reports_model_1.default({
                student: student._id,
                typeReport,
                details,
                pdfFilename,
            });
            yield newReport.save();
            return newReport.toObject();
        });
    }
    getAllReports() {
        return __awaiter(this, void 0, void 0, function* () {
            return reports_model_1.default.find().populate('student', 'names lastname');
        });
    }
    getReportById(reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            return reports_model_1.default.findById(reportId).populate('student', 'names lastname');
        });
    }
    deleteReport(reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            return reports_model_1.default.findByIdAndDelete(reportId).populate('student', 'names lastname');
        });
    }
    createReportPDF(studentName, typeReport, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new pdfkit_1.default();
            const filePath = path_1.default.join(__dirname, `../../Reports/Docs/${studentName}_${typeReport}.pdf`);
            if (!fs_1.default.existsSync(path_1.default.dirname(filePath))) {
                fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
            }
            doc.pipe(fs_1.default.createWriteStream(filePath));
            doc.fontSize(18).text('Reporte de Asistencia', { align: 'center' });
            doc.moveDown();
            doc.fontSize(13).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
            doc.fontSize(13).text(`Alumno/a: ${studentName}`);
            doc.fontSize(13).text(`Tipo de Reporte: ${typeReport}`);
            doc.moveDown();
            doc.fontSize(12).text(details);
            doc.moveDown();
            doc.fontSize(12).text('Queda debidamente notificado de su situación. Sin otro particular, lo/la saludo atentamente.');
            doc.end();
        });
    }
}
exports.ReportsService = ReportsService;

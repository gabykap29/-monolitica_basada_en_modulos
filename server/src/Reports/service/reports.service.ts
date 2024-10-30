import Report, { IReport, TypeReport } from './../model/reports.model';
import User, { Role } from '../../Users/models/Users';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export class ReportsService {
  public async generateReport(studentId: string, typeReport: TypeReport): Promise<IReport> {
    // Buscar al estudiante en la colección de usuarios
    const student = await User.findOne({ _id: studentId, role: Role.Student });
    
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

    let details = '';
    if (typeReport === TypeReport.FreeinMatter) {
      details = `El alumno ${student.names} ${student.lastname} ha quedado libre en la materia debido a faltas excesivas.`;
    } else if (typeReport === TypeReport.FaultNotice) {
      details = `El alumno ${student.names} ${student.lastname} ha acumulado muchas faltas (número de faltas).`;
    }

    // Crear y guardar el reporte en la base de datos
    const newReport = new Report({
      student: student._id,
      typeReport,
      details,
    });
    await newReport.save();

    // Crear el archivo PDF
    this.createReportPDF(`${student.names} ${student.lastname}`, typeReport, details);

    return newReport.toObject(); // Devolver el reporte como objeto
  }

  public async getAllReports(): Promise<IReport[]> {
    return Report.find().populate('student', 'names lastname');
  }

  public async getReportById(reportId: string): Promise<IReport | null> {
    return Report.findById(reportId).populate('student', 'names lastname');
  }

  public async deleteReport(reportId: string): Promise<IReport | null> {
    return Report.findByIdAndDelete(reportId).populate('student', 'names lastname');
  }

  private createReportPDF(studentName: string, typeReport: TypeReport, details: string) {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../../reports/Docs/${studentName}_report.pdf`);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('Reporte de Asistencia', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Alumno: ${studentName}`);
    doc.text(`Tipo de Reporte: ${typeReport}`);
    doc.moveDown();
    doc.text(details);

    doc.end();
  }
}

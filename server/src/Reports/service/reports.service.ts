import Report, { IReport, TypeReport } from './../model/reports.model';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { Types } from 'mongoose';

export class ReportsService {
  public async generateReport(studentId: string, typeReport: TypeReport): Promise<IReport> {
    // Datos simulados del alumno
    const student = {
      _id: new Types.ObjectId('000000000000000000000001'),
      name: 'Juan Pérez',
      course: '3er Año',
      fault: 15,
    };

    let details = '';
    if (typeReport === TypeReport.FreeinMatter) {
      details = `El alumno ${student.name} ha quedado libre en la materia debido a faltas excesivas.`;
    } else if (typeReport === TypeReport.FaultNotice) {
      details = `El alumno ${student.name} ha acumulado muchas faltas (${student.fault}).`;
    }

    // Crear el reporte sin guardarlo en la base de datos
    const newReport = new Report({
      student: student._id,
      typeReport,
      details,
    });

    // Crear el archivo PDF sin guardar en la base de datos
    this.createReportPDF(student.name, typeReport, details);

    // Simular una respuesta similar a la que MongoDB retornaría
    return newReport.toObject();
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

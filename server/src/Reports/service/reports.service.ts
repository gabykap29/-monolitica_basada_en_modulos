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
      details = `Por medio de la presente, le informamos que, debido al número de inasistencias registradas en el cuatrimestre actual, ha quedado en condición de alumno libre en las materias que corresponden a su plan de estudios. La normativa vigente establece que para mantener la regularidad es necesario cumplir con al menos un 80% de asistencia en cada materia.

Lamentablemente, su registro de asistencias ha reflejado un número de inasistencias injustificadas que supera el margen permitido para mantener dicha condición. En consecuencia, esta situación lo inhabilita para participar en las actividades regulares y evaluaciones continuas del presente cuatrimestre en las asignaturas afectadas.

Como alumno en condición de "libre", podrá acceder a la instancia de evaluación final de cada asignatura según los requisitos y calendario del cuatrimestre, pero no podrá participar en las clases ni en las evaluaciones parciales. Le recomendamos revisar el reglamento de asistencia de la institución para conocer más detalles sobre sus opciones en esta modalidad y acercarse a los preceptores en caso de necesitar asesoría adicional.`;
    } else if (typeReport === TypeReport.FaultNotice) {
      details = `Me dirijo a Ud. para informarle que en el registro de asistencias de la carrera se han consignado inasistencias injustificadas en las materias correspondientes a su plan de estudios. Desde el inicio de clases hasta el día de la fecha, se han contabilizado varias ausencias que exceden el límite permitido para conservar la regularidad. Le recordamos que, según el reglamento institucional, uno de los requisitos fundamentales para mantener el estado de alumno regular es que el porcentaje de asistencia sea, como mínimo, del 80%.

Es nuestro deber resaltar que el incumplimiento de este criterio afecta su continuidad en el presente cuatrimestre. La institución considera la asistencia una condición esencial no solo para garantizar su progreso académico, sino también para cumplir con los lineamientos que permiten un aprendizaje continuo y efectivo. De este modo, cualquier ausencia adicional que no esté debidamente justificada podría derivar en la pérdida de su regularidad, con el consecuente pase a condición de alumno libre.

Con la presente notificación, y con el compromiso de apoyarlo en el cumplimiento de sus objetivos académicos, le instamos a tomar las medidas pertinentes para evitar incurrir en nuevas inasistencias injustificadas durante el resto del cuatrimestre. Si necesita orientación o si existen circunstancias excepcionales que puedan estar afectando su asistencia, le recomendamos ponerse en contacto con los preceptores de su área o con la oficina de asistencia estudiantil.`;
    }

    const pdfFilename = `${student.names} ${student.lastname}_${typeReport}.pdf`;

    await this.createReportPDF(`${student.names} ${student.lastname}`, typeReport, details);

    const newReport = new Report({
      student: student._id,
      typeReport,
      details,
      pdfFilename,
    });

    await newReport.save();

    return newReport.toObject();
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

  private async createReportPDF(studentName: string, typeReport: TypeReport, details: string) {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../../Reports/Docs/${studentName}_${typeReport}.pdf`);

    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    doc.pipe(fs.createWriteStream(filePath));

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
}
}
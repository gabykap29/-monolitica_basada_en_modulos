import { Request, RequestHandler, Response } from 'express';
import { ReportsService } from './../service/reports.service';
import { TypeReport } from './../model/reports.model';

class ReportsController {
  private reportsService: ReportsService;

  constructor() {
    this.reportsService = new ReportsService();
  }

  public createReport: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { studentId, typeReport } = req.body;
  
      if (!studentId || !typeReport) {
        res.status(400).json({ message: 'Faltan datos requeridos' });
        return;
      }
  
      const newReport = await this.reportsService.generateReport(studentId, typeReport as TypeReport);
      res.status(201).json(newReport);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).json({ message: 'Error al generar el reporte', error: error instanceof Error ? error.message : error });
    }
  };
}

export default new ReportsController();

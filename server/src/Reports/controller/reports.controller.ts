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

  public deleteReport: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedReport = await this.reportsService.deleteReport(id);

      if (!deletedReport) {
        res.status(404).json({ message: 'Reporte no encontrado' });
      }

      res.status(200).json({ message: 'Reporte eliminado correctamente', deletedReport });
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
      res.status(500).json({ message: 'Error al eliminar el reporte', error: error instanceof Error ? error.message : error });
    }
  };

  public getAllReports: RequestHandler = async (_req: Request, res: Response) => {
    try {
      const reports = await this.reportsService.getAllReports();
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
      res.status(500).json({ message: 'Error al obtener los reportes', error: error instanceof Error ? error.message : error });
    }
  };

  public getReportById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const report = await this.reportsService.getReportById(id);
  
      if (!report) {
        res.status(404).json({ message: 'Reporte no encontrado' });
      }
  
      res.status(200).json(report);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
      res.status(500).json({ message: 'Error al obtener el reporte', error: error instanceof Error ? error.message : error });
    }
  };
}

export default new ReportsController();

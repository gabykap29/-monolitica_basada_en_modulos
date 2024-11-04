import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

class AuditCtrl {
  async getLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logType = req.params.logType || 'combined'; 
      const logFilePath = path.join(__dirname, `../logs/${logType}.log`);

      if (!fs.existsSync(logFilePath)) {
        res.status(404).json({ message: 'El archivo de logs no existe' });
        return;
      }

      const logs = fs.readFileSync(logFilePath, 'utf-8');
      const logEntries = logs.split('\n').filter(Boolean).map(line => JSON.parse(line));

      res.status(200).json({ status: 200, logs: logEntries });
    } catch (error) {
      console.error('Error al obtener los logs:', error);
      res.status(500).json({ message: 'Error interno al obtener los logs' });
    }
  }
}

export default AuditCtrl;

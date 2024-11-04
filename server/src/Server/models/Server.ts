import express, { Application } from 'express';
import cors from 'cors';
import { db } from '../../database/db';
import routerTest from '../routes/routerTest';
import { PORT } from '../config/config';
import userRouter from '../../Users/routes/users.routes';
import authRouter from '../../Auth/routes/auth.routes';
import attendanceRouter from '../../Attendance/router/Attendance.routes';
import reportRouter from '../../Reports/routes/reports.route'
import { userInitial } from '../helpers/userInitial';
import cron from 'node-cron';
import { AttendanceService } from '../../Attendance/service/Attendance.services';
import { loggerMiddleware } from '../middlewares/winston';
import path from "path";
import auditRouter from "../../Aud/routes/audit.routes"


const attendanceService = new AttendanceService();


class Server {
  private app: Application;
  private port: number;
  constructor() {
    this.app = express();
    this.port = Number(PORT);

    this.dbConnect();
    this.middlewares();
    this.routes();
    this.scheduleTasks();
  }

  private async dbConnect(): Promise<void> {
    await db.connect();
  }
  private async middlewares(): Promise<void> {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(loggerMiddleware);
  }
  private routes(): void {
    this.app.use(routerTest);
    this.app.use('/api/', userRouter);
    this.app.use('/api/', authRouter);
    this.app.use('/api/', attendanceRouter);
    this.app.use('/reports', express.static(path.join(__dirname, 'Reports/Docs')));
    this.app.use('/api/', auditRouter)
    this.app.use('/api', reportRouter);
  }

  private scheduleTasks(): void {
    cron.schedule('15 9 * * *', async () => {
      console.log('Ejecutando la tarea de marcar ausentes a las 9:15 AM');
      try {
        attendanceService.markAbsent();
      } catch (error) {
        console.error('Error al registrar ausentes:', error);
      }
    });
  }


  public listen(): void {
    this.app.listen(this.port, '0.0.0.0', async () => {
      console.log('Servidor funcionando en el puerto: ' + this.port);
    });
  }
}

export default Server;

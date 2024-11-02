import express, { Application } from 'express';
import cors from 'cors';
import { db } from '../../database/db';
import routerTest from '../routes/routerTest';
import { PORT } from '../config/config';
import userRouter from '../../Users/routes/users.routes';
import authRouter from '../../Auth/routes/auth.routes';
import attendanceRouter from '../../Attendance/router/Attendance.routes';
import { userInitial } from '../helpers/userInitial';
import cron from 'node-cron';
import dayjs from 'dayjs';
import { AttendanceService } from '../../Attendance/service/Attendance.services';
import UserService from '../../Users/service/UserService';
import { CustomError } from '../helpers/customError';
import { loggerMiddleware } from '../middlewares/winston';

const attendanceService = new AttendanceService();
const userService = new UserService();

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
  }

  private scheduleTasks(): void {
    cron.schedule('15 9 * * *', async () => {
      console.log('Ejecutando la tarea de marcar ausentes a las 9:15 AM');
      try {
        const todayDate = dayjs().format('YYYY-MM-DD');

        // TODO: Encuentra a los estudiantes que no tienen un registro de "presente" para el día actual
        const students = await userService.getAllUser('stundent');
        const presentStudents = await attendanceService.findAllByDate({
          date: todayDate,
        });

        if (
          typeof presentStudents !== 'boolean' &&
          !(students instanceof CustomError)
        ) {
          const absentStudent = students.filter(
            (student) =>
              !presentStudents.some(
                (present) => present.idStudent === student._id,
              ),
          );

          // TODO: Agrega el estado de "ausente" para cada estudiante sin asistencia en el día actual

          console.log('Registro de ausentes completado');
        }
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

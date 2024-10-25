import { AttendanceRepository } from "../repository/Attendance.repository"
import { IAttendance } from "../model/Attendance"

export class AttendanceService {

    private AttendanceRepository: AttendanceRepository = new AttendanceRepository();

    public async markAttendance(attendanceData: IAttendance): Promise<IAttendance> {
        try {

            const attendance = await this.AttendanceRepository.create(attendanceData);

            return attendance;

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al marcar la asistencia del estudiante"
            );
        }
    }

    public async findAllByDate(date: string): Promise<IAttendance[] | boolean> {
        try {
            const attendances = await this.AttendanceRepository.findAllByDate(date)

            return attendances

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante en esa fecha"
            );
        }
    }

    public async findOneAttendance(id: string): Promise<IAttendance | boolean> {
        try {
            const attendances = await this.AttendanceRepository.findId(id)

            return attendances

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante."
            );
        }
    }

    public async findAttendancesByUser(idUser: string) {
        try {
            const attendances = await this.AttendanceRepository.findAllByStudent
                (idUser);

            return attendances

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante"
            );
        }
    }

    public async deleteAttendance(idUser: string): Promise<boolean | undefined> {
        try {
            const attendances = await this.AttendanceRepository.delete(idUser)

            return attendances

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al eliminar asistencia del estudiante"
            );
        }
    }

}
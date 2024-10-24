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

}
import { AttendanceRepository } from "../repository/Attendance.repository"
import { IAttendance } from "../model/Attendance"
import UserService from "../../Users/service/UserService"
import { CustomError } from "../../Server/helpers/customError";
import dayjs from "dayjs";
import { decodeToken, IContentToken } from "../../Auth/helpers/jwt"

const userService = new UserService()

export class AttendanceService {

    private AttendanceRepository: AttendanceRepository = new AttendanceRepository();

    public async markAttendance(attendanceData: { idStudent: string, isPresent: boolean }, token: string | undefined): Promise<IAttendance> {
        try {
            if (token && token !== "") {
                const idUser: any = decodeToken(token)

                console.log(idUser);
                console.log(token);


                const attendance = await this.AttendanceRepository.create({ idStudent: idUser.id, isPresent: attendanceData.isPresent });
                return attendance;
            } else {
                const attendance = await this.AttendanceRepository.create({ idStudent: attendanceData.idStudent, isPresent: attendanceData.isPresent });
                return attendance;
            }


        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al marcar la asistencia del estudiante"
            );
        }
    }

    public async findAllByDate({ date }: { date: string }): Promise<IAttendance[] | []> {
        try {
            console.log(date);

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

    public async findAttendancesByUser(token: any) {
        try {

            const idUser: any = decodeToken(token)

            const attendances = await this.AttendanceRepository.findAllByStudent(idUser.id);

            return attendances

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al buscar las asistencia del estudiante"
            );
        }
    }

    public async findAttendancesGroupedByDate(month: string) {

        try {
            const attendances = await this.AttendanceRepository.findAllAgrupedByDate(month);

            console.log(attendances);

            if (typeof attendances !== "boolean") {
                const formatedAttendances = attendances.map((attendance) => (
                    {
                        id: attendance._id,
                        idStudent: attendance.idStudent,
                        start: attendance.createdAt,
                        end: attendance.createdAt,
                        title: attendance.isPresent

                    }))

                return formatedAttendances;
            }

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

    public async updateAttendance(idAttendance: string): Promise<boolean> {
        try {
            const attendances = await this.AttendanceRepository.update(idAttendance)

            return attendances

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al actualizar la asistencia del estudiante"
            );
        }
    }

    public async markAbsent(): Promise<boolean | undefined | any> {
        try {
            console.log('EMPEZO EL Registro de ausentes completado')
            const todayDate = dayjs().format('YYYY-MM-DD')

            const students = await userService.getAllUser("student")

            const presentStudents = await this.findAllByDate({ date: todayDate })

            if (typeof presentStudents !== 'boolean' && !(students instanceof CustomError)) {

                const absentStudents = students.filter(student => {
                    const isAbsent = !presentStudents.some(present => {

                        if (typeof present.idStudent === 'object') {
                            console.log("Comparando:", { presentId: present.idStudent._id, _id: String(student._id) });

                            return present?.idStudent?._id.toString() === String(student._id)
                        }
                    });
                    return isAbsent;
                });

                absentStudents.forEach(absent => {
                    this.markAttendance({ idStudent: String(absent._id), isPresent: false }, "")
                })

                console.log('Registro de ausentes completado')
                return { presentLength: presentStudents.length, absentLength: absentStudents.length, sudentsLength: students.length }
            }

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message : "Error al marcar ausentes de estudiantes"
            );
        }
    }

}
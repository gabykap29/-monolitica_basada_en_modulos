import { AttendanceRepository } from "../repository/Attendance.repository"
import { IAttendance } from "../model/Attendance"
import UserService from "../../Users/service/UserService"
import { CustomError } from "../../Server/helpers/customError";
import dayjs from "dayjs";
import { decodeToken, IContentToken } from "../../Auth/helpers/jwt"

const userService = new UserService()

export class AttendanceService {

    private AttendanceRepository: AttendanceRepository = new AttendanceRepository();

    public async markAttendance(attendanceData: { idStudent: string, isPresent: boolean }, token: string | undefined): Promise<{ status: boolean, message: string }> {

        try {
            const horaActual = dayjs();
            const limiteHora = dayjs().hour(9).minute(15);
            console.log("TOKEN" + token);

            if (typeof token === "string") {
                const userInfo: IContentToken | boolean = decodeToken(token)
                if (typeof userInfo !== "boolean") {
                    if (userInfo.role === "student") {
                        if (horaActual.isBefore(limiteHora)) {
                            const attendance = await this.AttendanceRepository.create({ idStudent: userInfo?.id, isPresent: attendanceData.isPresent });
                            return attendance && { status: true, message: "Asistencia creada correctamete" };
                        } else {
                            return {
                                status: false, message: "Ya a pasado la fecha limite para marcar la asistencia, las " + limiteHora.format('HH:mm A')
                            }
                        }
                    } else {
                        const attendance = await this.AttendanceRepository.create({ idStudent: attendanceData.idStudent, isPresent: attendanceData.isPresent });
                        return attendance && { status: true, message: "Asistencia creada correctamete" };
                    }
                } else {
                    throw new Error("Token invalido")
                }
            } else {
                throw new Error("No hay token en la petición")
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

    public async findAttendancesByUserParams(id: string) {
        try {

            console.log(id)

            const attendances = await this.AttendanceRepository.findAllByStudent(id);

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
            const todayDate = dayjs().format('YYYY-MM-DD')

            const students = await userService.getAllUser("student")

            const presentStudents = await this.findAllByDate({ date: todayDate })

            if (typeof presentStudents !== 'boolean' && !(students instanceof CustomError)) {

                const absentStudents = students.filter(student => {
                    const isAbsent = !presentStudents.some(present => {

                        if (typeof present.idStudent === 'object') {
                            // console.log("Comparando:", { presentId: present.idStudent._id, _id: String(student._id) });

                            return present?.idStudent?._id.toString() === String(student._id)
                        }
                    });
                    return isAbsent;
                });

                for (const absent of absentStudents) {
                    const attendance = await this.AttendanceRepository.create({ idStudent: String(absent._id), isPresent: false });
                }

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
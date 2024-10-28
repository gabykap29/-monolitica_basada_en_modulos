import { IAttendance, Attendance } from "../model/Attendance"

export class AttendanceRepository {

    constructor() { }

    async findId(IdAttendance: string): Promise<IAttendance | boolean> {
        try {
            const attendance = await Attendance.findById(IdAttendance)

            if (!attendance) {
                return false
            }

            return attendance

        } catch (error) {
            throw new Error("Error al buscar la asistencia del estudiante");
        }
    }

    async findAllByStudent(idStudent: string): Promise<IAttendance[] | boolean> {
        try {
            const attendance = await Attendance.find({ idStudent: idStudent })

            console.log(attendance);

            if (!attendance) {
                return false
            }
            return attendance

        } catch (error) {
            throw new Error("Error al buscar las asistencias del estudiante");
        }
    }

    async findAllByDate(date: string): Promise<IAttendance[] | boolean> {
        try {
            const attendance = await Attendance.find({
                $expr: {
                    $eq: [
                        { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        date
                    ]
                }
            }).populate('idStudent', 'names lastname')

            console.log(attendance);

            if (!attendance || attendance.length === 0) {
                return false;
            }

            return attendance;
        } catch (error) {
            console.log(error);
            throw new Error("Error al buscar las asistencias del estudiante por fecha");
        }
    }

    async create(attendance: IAttendance): Promise<IAttendance> {
        try {
            const newAttendance: IAttendance = await Attendance.create(attendance)

            return newAttendance

        } catch (error) {
            console.log(error);
            throw new Error(
                error instanceof Error ? error.message.includes("duplicate key") ? "La asistencia ya esta marcada para el dia de hoy" : "Error al crear una asistencia" : "Error al crear una asistencia");
        }
    }

    async delete(IdAttendance: string): Promise<boolean> {
        try {
            const attendance = await Attendance.findByIdAndDelete(IdAttendance)

            if (!attendance) {
                return false
            }

            return true

        } catch (error) {
            throw new Error("Error al eliminar una asistencia");
        }
    }
}
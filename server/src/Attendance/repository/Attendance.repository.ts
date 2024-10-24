import { IAttendance, Attendance } from "../model/Attendance"

export class AttendanceRepository {

    constructor() { }

    async findOne(IdAttendance: string): Promise<boolean> {
        try {
            const attendance = await Attendance.findById(IdAttendance)

            if (!attendance) {
                return false
            }

            return true

        } catch (error) {
            throw new Error("Error al buscar la asistencia del estudiante");
        }
    }

    async findAll(idStudent: string): Promise<boolean> {
        try {
            const attendance = await Attendance.find({ idStudent: idStudent })

            if (!attendance) {
                return false
            }

            return true

        } catch (error) {
            throw new Error("Error al buscar las asistencias del estudiante");
        }
    }

    async findAllByDate(date: string): Promise<boolean> {
        try {
            const attendance = await Attendance.find({ createdAt: date })

            if (!attendance) {
                return false
            }

            return true

        } catch (error) {
            throw new Error("Error al buscar las asistencias del estudiante por fecha");
        }
    }

    async create(attendance: IAttendance): Promise<IAttendance> {
        try {
            const newAttendance: IAttendance = await Attendance.create(attendance)

            return newAttendance

        } catch (error) {
            console.log(error);
            throw new Error("Error al crear una asistencia");
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
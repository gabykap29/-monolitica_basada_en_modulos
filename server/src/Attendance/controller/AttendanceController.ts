import { AttendanceService } from "../service/Attendance.services";
import { Request, Response } from "express";

export class AttendanceController {

    private AttendanceService: AttendanceService = new AttendanceService();

    constructor() { }

    getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const ipAddress = req.headers['x-forwarded-for'];

            console.log("IP address:", ipAddress);

            const users = await this.AttendanceService.markAttendance(req.body);

            res.status(200).json({
                status: 200,
                users: users
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor"
            });
        }
    }
}

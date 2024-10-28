import { AttendanceService } from "../service/Attendance.services";
import { Request, Response } from "express";

export class AttendanceController {

    private AttendanceService: AttendanceService = new AttendanceService();

    constructor() { }

    createAttendance = async (req: Request, res: Response): Promise<void> => {
        try {

            const attendance = await this.AttendanceService.markAttendance(req.body);

            res.status(200).json({
                status: 200,
                attendance: attendance
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor"
            });
        }
    }

    getAttendanceByUser = async (req: Request, res: Response): Promise<void> => {
        try {

            const attendance = await this.AttendanceService.findOneAttendance(req.params.attendance);

            res.status(200).json({
                status: 200,
                attendance: attendance
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor"
            });
        }
    }

    getAttendancesByDate = async (req: Request, res: Response): Promise<void> => {
        try {

            const attendances = await this.AttendanceService.findAllByDate(req.params.date);

            res.status(200).json({
                status: 200,
                attendances: attendances
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor"
            });
        }
    }

    getAllAttendancesByUser = async (req: Request, res: Response): Promise<void> => {
        try {

            const attendances = await this.AttendanceService.findAttendancesByUser(req.params.id);

            res.status(200).json({
                status: 200,
                attendances: attendances
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: error instanceof Error ? error.message : "Error interno del servidor"
            });
        }
    }

    deleteAttendance = async (req: Request, res: Response): Promise<void> => {
        try {

            const attendance = await this.AttendanceService.deleteAttendance(req.params.id);

            res.status(200).json({
                status: 200,
                attendance: attendance
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
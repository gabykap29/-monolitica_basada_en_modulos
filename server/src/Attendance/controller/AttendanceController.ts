import { AttendanceService } from "../service/Attendance.services";
import { Request, Response } from "express";

export class AttendanceController {

    private AttendanceService: AttendanceService = new AttendanceService();

    constructor() { }

    createAttendance = async (req: Request, res: Response): Promise<void> => {
        try {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            console.log("IP address:", ip);

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

    getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            // const ip = req.ip;
            // const ip = req.headers['x-forwarded-for']
            // const ip = req.socket.remoteAddress
            const ip = req.clientIp;

            console.log("IP address:", ip);

            const token = "a631f41522aa77";

            async function fetchIpInfo() {
                try {
                    const resp = await fetch(`https://ipinfo.io/${ip}?token=${token}`);
                    const json = await resp.json();
                    console.log(json);
                } catch (error) {
                    console.error("Error fetching IP info:", error);
                }
            }

            fetchIpInfo();

            const users = await this.AttendanceService.findAttendanceByUser(req.params.id);

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

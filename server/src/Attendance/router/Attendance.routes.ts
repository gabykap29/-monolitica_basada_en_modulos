import { Router } from "express";
import { AttendanceController } from "../controller/AttendanceController";

const attendanceController = new AttendanceController();

const router = Router();

router.post("/attendance", attendanceController.getUsers);

export default router;

import { Router } from "express";
import { AttendanceController } from "../controller/AttendanceController";

const attendanceController = new AttendanceController();

const router = Router();

router.get("/attendance/:id", attendanceController.getUsers);

router.post("/attendance", attendanceController.createAttendance);

export default router;

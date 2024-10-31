import { Router } from "express";
import { AttendanceController } from "../controller/AttendanceController";
import { AllowRequest } from "../middleware/allowRequest"

const attendanceController = new AttendanceController();

const router = Router();

router.get("/attendance/:attendance", attendanceController.getAttendanceByUser);

router.get("/attendances/:id", attendanceController.getAllAttendancesByUser);

router.get("/attendancesDate/:date", AllowRequest.isAllowed, AllowRequest.whereRequest, attendanceController.getAttendancesByDate);

router.post("/attendance", attendanceController.createAttendance);

router.delete("/attendance", attendanceController.createAttendance);

export default router;

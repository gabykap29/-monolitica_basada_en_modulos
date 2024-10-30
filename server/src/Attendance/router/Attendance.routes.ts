import { Router } from "express";
import { AttendanceController } from "../controller/AttendanceController";
import { AllowRequest } from "../middleware/allowRequest"

const attendanceController = new AttendanceController();

const router = Router();

router.get("/attendance/:attendance", attendanceController.getAttendanceByUser);

router.get("/attendances/:id", attendanceController.getAllAttendancesByUser);

router.post("/attendance", attendanceController.createAttendance);

router.post("/attendanceXD", attendanceController.createAbsent);

router.post("/attendances/", AllowRequest.isAllowed, AllowRequest.whereRequest, attendanceController.getAttendancesByDate);

router.delete("/attendance/:id", attendanceController.deleteAttendance);

router.put("/attendance", attendanceController.updateAttendance);

export default router;

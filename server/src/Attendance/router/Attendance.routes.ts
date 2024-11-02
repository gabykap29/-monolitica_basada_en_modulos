import { Router } from "express";
import { AttendanceController } from "../controller/AttendanceController";
import { AllowRequest } from "../middleware/allowRequest"

const attendanceController = new AttendanceController();

const router = Router();

router.get("/attendance/:attendance", attendanceController.getAttendanceById);

router.get("/attendances", AllowRequest.isAllowed, attendanceController.getAllAttendancesByUser);

router.get("/attendances/:id", AllowRequest.isAllowed, attendanceController.getAllAttendancesByUserParams);

router.get("/attendancesMonth/:month", AllowRequest.isAllowed, attendanceController.getAttendancesByMonth);

router.post("/attendance", attendanceController.createAttendance);

router.post("/absent", AllowRequest.isAllowed, attendanceController.createAbsent);

router.post("/attendances", AllowRequest.isAllowed, attendanceController.getAttendancesByDate);

router.delete("/attendance/:id", AllowRequest.isAllowed, attendanceController.deleteAttendance);

router.put("/attendance/:id", AllowRequest.isAllowed, attendanceController.updateAttendance);

export default router;

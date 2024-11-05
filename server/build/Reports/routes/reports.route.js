"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reports_controller_1 = __importDefault(require("../controller/reports.controller"));
const router = (0, express_1.Router)();
router.post('/reports', reports_controller_1.default.createReport);
router.get('/reports', reports_controller_1.default.getAllReports);
router.get('/reports/:id', reports_controller_1.default.getReportById);
router.delete('/reports/:id', reports_controller_1.default.deleteReport);
router.get('/pdf-reports/:filename', reports_controller_1.default.getPDFByName);
exports.default = router;

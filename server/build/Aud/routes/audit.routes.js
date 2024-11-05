"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_controllers_1 = __importDefault(require("../controllers/audit.controllers"));
const router = (0, express_1.Router)();
const auditCtrl = new audit_controllers_1.default();
router.get('/logs/:logType?', auditCtrl.getLogs.bind(auditCtrl));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const authCtrl = new auth_controllers_1.default();
//login
router.post('/login', authCtrl.login.bind(authCtrl));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const userCtrl = new user_controllers_1.default();
router.get('/users/:typeUser', userCtrl.getUsers.bind(userCtrl));
router.get('/user/:id', userCtrl.getUser.bind(userCtrl));
router.post('/users', userCtrl.userCreate.bind(userCtrl));
router.put('/users/:id', userCtrl.userUpdate.bind(userCtrl));
router.delete('/users/:id', userCtrl.deleteUser.bind(userCtrl));
exports.default = router;

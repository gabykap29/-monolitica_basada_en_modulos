"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const clientIp = req.ip;
    res.send("Servidor On, Public IP: " + clientIp);
});
exports.default = router;

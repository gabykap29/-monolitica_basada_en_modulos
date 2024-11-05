"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowRequest = void 0;
const whiteList_1 = require("../helper/whiteList");
class AllowRequest {
    constructor() { }
}
exports.AllowRequest = AllowRequest;
_a = AllowRequest;
AllowRequest.isAllowed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clientIP = req.ip;
    console.log("IP del cliente:", req.ip);
    console.log("Dirección remota:", req.connection.remoteAddress);
    console.log("CF Connecting IP:", req.headers['cf-connecting-ip']);
    console.log("X-Real-IP:", req.headers['x-real-ip']);
    console.log("X-Forwarded-For:", req.headers['x-forwarded-for']);
    console.log("Socket Remote Address:", req.socket.remoteAddress);
    req.clientIP = clientIP;
    if (clientIP === whiteList_1.ALLOWED_IP) {
        return next();
    }
    else {
        res.status(403).json({
            message: "Acceso denegado: IP no autorizada",
        });
    }
});
AllowRequest.whereRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.clientIP;
    if (ip) {
        try {
            const resp = yield fetch(`https://ipinfo.io/${ip}?token=${whiteList_1.IP_TOKEN}`);
            const json = yield resp.json();
            console.log(json);
            next(); // Llama a next() para continuar
        }
        catch (error) {
            console.error("Error fetching IP info:", error);
            res.status(500).json({ message: "Error fetching IP info" });
        }
    }
    else {
        res.status(400).json({ message: "IP no encontrada" });
    }
});

import { ALLOWED_IP, IP_TOKEN } from "../helper/whiteList";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
    clientIP?: string;
}

export class AllowRequest {
    constructor() {}

    static isAllowed = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
        const clientIP: string | string[] | undefined = req.ip;

        console.log("IP del cliente:", req.ip);
        console.log("Dirección remota:", req.connection.remoteAddress);
        console.log("CF Connecting IP:", req.headers['cf-connecting-ip']);
        console.log("X-Real-IP:", req.headers['x-real-ip']);
        console.log("X-Forwarded-For:", req.headers['x-forwarded-for']);
        console.log("Socket Remote Address:", req.socket.remoteAddress);

        req.clientIP = clientIP;

        if (clientIP === ALLOWED_IP) {
            return next();
        } else {
            res.status(403).json({
                message: "Acceso denegado: IP no autorizada",
            });
        }
    }

    static whereRequest = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
        const ip = req.clientIP;

        if (ip) {
            try {
                const resp = await fetch(`https://ipinfo.io/${ip}?token=${IP_TOKEN}`);
                const json = await resp.json();
                console.log(json);
                next(); // Llama a next() para continuar
            } catch (error) {
                console.error("Error fetching IP info:", error);
                res.status(500).json({ message: "Error fetching IP info" });
            }
        } else {
            res.status(400).json({ message: "IP no encontrada" });
        }
    }
}

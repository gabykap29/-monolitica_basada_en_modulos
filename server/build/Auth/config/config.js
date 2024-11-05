"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretJWT = void 0;
require("dotenv/config");
exports.secretJWT = process.env.JWT_SECRET || "";

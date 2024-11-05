"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.mongoUri = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.mongoUri = process.env.MONGO_URI;
exports.PORT = process.env.PORT || 4000;

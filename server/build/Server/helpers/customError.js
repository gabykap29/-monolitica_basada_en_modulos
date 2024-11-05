"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(statusCode, message) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;

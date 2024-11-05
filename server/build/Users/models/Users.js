"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Student"] = "student";
    Role["Preceptor"] = "preceptor";
})(Role || (exports.Role = Role = {}));
const UserShema = new mongoose_1.Schema({
    names: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    dni: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Role,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)('User', UserShema);
exports.default = User;

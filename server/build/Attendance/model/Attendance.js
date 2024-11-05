"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const mongoose_1 = require("mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
const AttendanceSchema = new mongoose_1.Schema({
    idStudent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isPresent: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
AttendanceSchema.pre("save", function (next) {
    if (this.isNew) {
        this.createdAt = (0, dayjs_1.default)(this.createdAt).startOf("day").toDate();
    }
    next();
});
AttendanceSchema.index({ idStudent: 1, createdAt: 1 }, { unique: true });
exports.Attendance = (0, mongoose_1.model)('Attendance', AttendanceSchema);

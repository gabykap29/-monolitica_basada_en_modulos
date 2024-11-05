"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeReport = void 0;
const mongoose_1 = require("mongoose");
var TypeReport;
(function (TypeReport) {
    TypeReport["FreeinMatter"] = "Notificado de estado libre";
    TypeReport["FaultNotice"] = "Notificado de faltas";
})(TypeReport || (exports.TypeReport = TypeReport = {}));
const ReportSchema = new mongoose_1.Schema({
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    typeReport: {
        type: String,
        enum: TypeReport,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: String,
    },
    pdfFilename: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Report = (0, mongoose_1.model)('Report', ReportSchema);
exports.default = Report;

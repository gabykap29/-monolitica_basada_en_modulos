import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAttendance extends Document {
    idStudent: ObjectId | string,
    isPresent: boolean,
}

const AttendanceSchema = new Schema<IAttendance>({
    idStudent: {
        type: Schema.Types.ObjectId,
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

export const Attendance = model('Attendance', AttendanceSchema);

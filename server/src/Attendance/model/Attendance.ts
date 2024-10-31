import { Schema, Document, model, ObjectId } from "mongoose";
import dayjs from "dayjs";

export interface IstudentData {
    _id: ObjectId | string;
    names: string;
    lastname: string;
}

export interface IAttendance extends Document {
    idStudent: IstudentData | string;
    isPresent: boolean;
    createdAt?: Date;
    updatedAt?: Date;
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

AttendanceSchema.pre("save", function (next) {
    if (this.isNew) {
        this.createdAt = dayjs(this.createdAt).startOf("day").toDate();
    }
    next();
});

AttendanceSchema.index(
    { idStudent: 1, createdAt: 1 },
    { unique: true }
);

export const Attendance = model('Attendance', AttendanceSchema);

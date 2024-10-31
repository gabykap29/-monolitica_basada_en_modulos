import { Schema, Document, model, Model, Types } from 'mongoose';

export enum TypeReport {
  FreeinMatter = 'Notificado de estado libre',
  FaultNotice = 'Notificado de faltas',
}

export interface IReport extends Document {
  student: Types.ObjectId;
  typeReport: TypeReport;
  date: Date;
  details: string;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>({
  student: {
    type: Schema.Types.ObjectId,
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
}, {
  timestamps: true,
});

const Report = model('Report', ReportSchema);

export default Report;

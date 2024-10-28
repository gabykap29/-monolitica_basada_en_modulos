import { Schema, Document, model } from 'mongoose';

export enum Role {
  Admin = 'admin',
  Student = 'student',
  Preceptor = 'preceptor',
}

export interface IUser extends Document {
  names: string;
  lastname: string;
  birthdate: Date;
  dni: number;
  address: string;
  phone: number;
  username: string;
  pass: string;
  mail: string;
  role: Role;
}

const UserShema = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  },
);

const User = model('User', UserShema);

export default User;

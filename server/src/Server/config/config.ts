import { config } from 'dotenv';
config();

export const mongoUri = process.env.MONGO_URI;
export const PORT = process.env.PORT || 4000;

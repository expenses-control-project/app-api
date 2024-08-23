import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

export const DATABASE_URL = process.env.DATABASE_URL as string;
export const PORT = process.env.PORT || 3002;

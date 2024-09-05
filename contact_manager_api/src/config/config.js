import * as dotenv from 'dotenv';
dotenv.config();

export const port = 3000;
export const db = {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PORT,
};
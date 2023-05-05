import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    type: process.env.DATABASE_TYPE || 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    db: process.env.DATABASE_DB,
}));
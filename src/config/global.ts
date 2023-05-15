import { registerAs } from "@nestjs/config";

export default registerAs('global', () => ({
    port: parseInt(process.env.PORT, 10) || 9200,
    production: process.env.NODE_ENV === 'development' ? false : true,
}));
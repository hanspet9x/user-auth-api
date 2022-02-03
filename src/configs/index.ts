import dotenv from 'dotenv';
dotenv.config();

export const getEnv = (env: string, def: any) => process.env[env] || def;
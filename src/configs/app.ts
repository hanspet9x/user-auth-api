import { getEnv } from ".";

export const appConfigs = {
    PORT: getEnv('SERVER_PORT', 3000),
    WHITELIST: getEnv('WHITELIST', '[127.0.0.1]'),
    passwordSalt: getEnv('PASSWORD_SALT', 'salt'),
    jwtSecret: getEnv('JWT_SECRET', 'token'),
    jwtExpire: getEnv('JWT_EXPIRE', '5m'),
    dbHost: getEnv('DB_HOST', ''),
}
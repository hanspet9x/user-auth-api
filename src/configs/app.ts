import { getEnv } from ".";

export const appConfigs = {
    PORT: getEnv('SERVER_PORT'),
    WHITELIST: getEnv('WHITELIST')
}
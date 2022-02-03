import { getEnv } from "./index";

export const emailConfig = {
  host: getEnv("EMAIL_HOST", ""),
  port: getEnv("EMAIL_PORT", ""),
  user: getEnv("EMAIL_USER", ""),
  pass: getEnv("EMAIL_PASSWORD", ""),
};

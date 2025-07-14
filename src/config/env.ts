import { envsafe, str, port } from "envsafe";
import dotenv from "dotenv";

dotenv.config();

export const env = envsafe({
  DATABASE_URL: str(),
  JWT_SECRET: str(),
  PORT: port({ default: 3000 }),
  VITE_OPENAI_API_KEY: str(),
});
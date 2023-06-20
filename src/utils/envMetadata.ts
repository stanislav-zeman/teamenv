const DATABASE_URL = process.env.DATABASE_URL;
const HOST = process.env.HOST;

if (typeof window !== "undefined") {
  if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");
  if (!HOST) throw new Error("HOST is not defined");
}

const environment = {
  DATABASE_URL,
  HOST,
}

export default environment;
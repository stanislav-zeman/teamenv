const DATABASE_URL = process.env.DATABASE_URL ?? "postgres://EnsIaver:Sz6gQmCK9Dcq@ep-noisy-pine-411524-pooler.eu-central-1.aws.neon.tech/neondb?pgbouncer=true&connect_timeout=10";
const HOST = process.env.HOST ?? "http://localhost:3000";

if (typeof window !== "undefined") {
  if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined");
  if (!HOST) throw new Error("HOST is not defined");
}

const environment = {
  DATABASE_URL,
  HOST,
}

export default environment;
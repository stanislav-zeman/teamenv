const HOST = process.env.HOST ?? "http://localhost:3000";

if (typeof window !== "undefined") {
  if (!HOST) throw new Error("HOST is not defined");
}

const environment = {
  HOST,
}

export default environment;

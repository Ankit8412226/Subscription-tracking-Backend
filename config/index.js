import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

console.log(process.env.PORT_LOCAL);

export default {
  port: process.env.PORT_LOCAL,
};

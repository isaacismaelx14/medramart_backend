import dotenv from "dotenv";
import { connect } from "./config/typeorm";
import { Mailer } from "./config/mailer";
import { Server } from "./app";

const mailer = new Mailer();
const server = new Server();

async function main() {
  dotenv.config();
  server.start();
  connect();
  mailer.start();
}

main();

import dotenv from "dotenv";
import { connect } from "./config/typeorm";
import { Mailer } from "./config/mailer";
import { Server } from "./app";

const mailer:Mailer = new Mailer();
const server:Server = new Server();

async function main():Promise<void> {
  dotenv.config();
  server.start();
  connect();
  mailer.start();
}

main();

import dotenv from "dotenv";
import { DataBase } from "./config/typeorm";
import { Mailer } from "./config/mailer";
import { Server } from "./app";

const server: Server = new Server();
const database: DataBase = new DataBase();
const mailer: Mailer = new Mailer();

async function main(): Promise<void> {
  dotenv.config();
  server.start();
  database.connect();
  mailer.start();
}

main();

import { server } from "./app";
import dotenv from 'dotenv';
import { connect } from "./config/typeorm";
import { Mailer } from "./config/mailer";

dotenv.config();
const _PORT = process.env.PORT || 4000;
const mailer = new Mailer();

async function main() {
  const app = await server();

  app.listen({ port: _PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${_PORT}/`);
    connect();
    mailer.start();
  });
}

main();
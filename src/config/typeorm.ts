import { Connection, createConnection } from "typeorm";
import path from "path";

export async function connect() {
  await createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: "medramart",
    entities: [path.join(__dirname, "../entity/**/*{.ts,.js}")],
    synchronize: true,
  });

  console.log("💿 Database is connect");
}

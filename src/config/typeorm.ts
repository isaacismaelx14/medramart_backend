import { ConnectionOptions, createConnection } from "typeorm";
import path from "path";

export class DataBase {
  private options: ConnectionOptions;

  constructor(config?: ConnectionOptions) {
    this.options = {
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: "medramart",
      entities: [path.join(__dirname, "../entity/**/*{.ts,.js}")],
      synchronize: true,
    };
    if (config) this.options = config;
  }

  async connect(): Promise<void> {
    await createConnection(this.options);
    console.log(`💿 Database is connected to ${this.options.database}`);
  }
}

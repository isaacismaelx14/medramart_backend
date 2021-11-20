import express, { Express, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import apolloServerConfig from "./config/apolloServer";
import { UserController } from "./controllers/User.ctrl";

const userCtrl = new UserController();
export interface IContext {
  user: any;
}

export class Server {
  app: Express = express();
  private apolloServer: ApolloServer;
  private _PORT;

  constructor(port: number = 4000) {
    this._PORT = process.env.PORT || port;
    this.apolloServer = apolloServerConfig;
    this.middlewares();
    this.routes();
  }

  async middlewares() {
    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({ app: this.app, path: "/graphql" });
  }

  routes() {
    this.app.get("/validate/:salt", userCtrl.validateCode);
  }

  start() {
    this.app.listen(this._PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${this._PORT}/`);
    });
  }
}

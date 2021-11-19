import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { CategoryResolvers } from "./resolvers/CategoryResolvers";
import { ServiceResolvers } from "./resolvers/ServiceResolvers";
import { TicketResolvers } from "./resolvers/TicketResolvers";
import { UserResolvers } from "./resolvers/UsersResolvers";
import Auth from "./auth";

export interface IContext {
  user: any;
}

const auth = new Auth();

export async function server(): Promise<Express> {
  const app: Express = express();
  const server = new ApolloServer({
    resolvers: [
      resolvers,
      CategoryResolvers,
      ServiceResolvers,
      TicketResolvers,
      UserResolvers,
    ],
    typeDefs,
    context: ({ req }): IContext => {
      const token = req.headers.authorization || "";
      const user = auth.validateToken(token);
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  console.log();
  return app;
}

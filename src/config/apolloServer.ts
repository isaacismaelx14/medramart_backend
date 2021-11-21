import { ApolloServer } from "apollo-server-express";
import { IContext } from "../app";
import Auth, { JwtObj } from "../auth";
import { resolvers } from "../graphql/resolvers";
import { CategoryResolvers } from "../resolvers/CategoryResolvers";
import { ServiceResolvers } from "../resolvers/ServiceResolvers";
import { TicketResolvers } from "../resolvers/TicketResolvers";
import { UserResolvers } from "../resolvers/UsersResolvers";
import { typeDefs } from "../graphql/typeDefs";

const auth = new Auth();

export default new ApolloServer({
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
    const validated: JwtObj = auth.validateToken(token);
    const user = !validated.suscess ? false : validated.data;
    return { user };
  },
});

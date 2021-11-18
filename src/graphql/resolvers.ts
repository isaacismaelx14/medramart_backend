import { Categories } from "../entity/categories";
import { Services } from "../entity/services";
import { Tickets } from "../entity/tickets";
import { Users } from "../entity/users";
import { GenerateID } from "../helpers/generateId";
import { DecryptPassword, EncryptPassword } from "../helpers/passwords";

export const resolvers = {
  Query: {
    ping: function () {
      return "pong!!";
    },

  },

  Mutation: {
   

  },
};

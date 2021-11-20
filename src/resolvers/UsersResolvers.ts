import { IContext } from "../app";
import { UserController } from "../controllers/User.ctrl";
import { Users } from "../entity/users";

const userCtrl = new UserController();

export const UserResolvers = {
  Query: {
    users: async () =>
      await Users.find({
        select: ["uuid", "email", "name", "type", "created_at", "updated_at"],
      }),
  },
  Mutation: {
    createUser: (_: any, input: any) => userCtrl.signUp(input),
    deleteUser: (_: any, input: any, context: IContext) =>
      userCtrl.delete(input, context),
    login: async (_: any, input: any) => userCtrl.login(input),
  },
};

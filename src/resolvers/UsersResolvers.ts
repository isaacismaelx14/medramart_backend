import Auth from "../auth";
import { Users } from "../entity/users";
import { GenerateID } from "../helpers/generateId";
import { EncryptPassword } from "../helpers/passwords";

const auth = new Auth();
const createUser = async (_: any, input: any) => {
  const data: Users = {
    ...input,
    email: input.email.toLowerCase(),
    name: input.name.toLowerCase(),
    type: input.type.toLowerCase(),
    uuid: GenerateID("US", {
      bytes: 5,
      useSeparators: false,
      useUpperCase: false,
    }),
    password: await EncryptPassword(input.password),
  };

  const user = await Users.create(data);
  await user.save();
  return true;
};

const deleteUser = async (_: any, { uuid }: Users) => {
  Users.delete(uuid);
  return true;
};

export const UserResolvers = {
  Query: { users: async () => await Users.find() },
  Mutation: {
    createUser,
    deleteUser,
    login: async (_: any, { email, password }: Users) =>
      auth.login(email, password),
  },
};

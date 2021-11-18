import { Users } from "./entity/users";
import { IRespose } from "./graphql/typeDefs";
import { DecryptPassword } from "./helpers/passwords";
import jwt from "jsonwebtoken";

export default class Auth {
  private secret = process.env.SECRET;

  constructor() {}
  private error(message: string): IRespose {
    return {
      error: [{ message }],
      suscess: false,
    };
  }

  async login(email: string, password: string): Promise<IRespose> {
    const user = await Users.findOne({ where: { email } });
    if (!user) return this.error("User not found");
    const isValid = await DecryptPassword(password, user.password);
    if (!isValid) return this.error("Invalid password");

    return {
      token: user.uuid,
      suscess: true,
      error: [],
    };
  }
}

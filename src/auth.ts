import { Users } from "./entity/users";
import { IResponse } from "./graphql/typeDefs";
import { DecryptPassword } from "./helpers/passwords";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { Messages } from "./helpers/messages";

export default class Auth extends Messages {
  private secret: string = process.env.SECRET + "";

  constructor() {
    super();
  }

  generateToken(user: Users): string {
    const token: string = jwt.sign(
      {
        uuid: user.uuid,
        email: user.email,
        type: user.type,
      },
      this.secret,
      { expiresIn: "5d" }
    );
    return token;
  }

  validateToken(token: string): JwtPayload | string | boolean {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string): Promise<IResponse> {
    const user = await Users.findOne({ where: { email } });
    if (!user) return this.error("User not found");
    const isValid = await DecryptPassword(password, user.password);
    if (!isValid) return this.error("Invalid password");

    return this.success(this.generateToken(user));
  }
}

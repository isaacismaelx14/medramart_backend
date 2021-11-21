import { Users } from "./entity/users";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Messages } from "./helpers/messages";

type jwtError = {
  message: string;
};

export type JwtObj = {
  suscess: boolean;
  error: jwtError[];
  data?: any;
};
export default class Auth extends Messages {
  /** the secret from the .env */
  private secret: string = process.env.SECRET + "";

  constructor() {
    super();
  }

  /**
   * Generate a token for the user
   * @param user the user will be authenticated
   * @returns token: string
   */
  generateToken(user: Users, expiresIn?: string): string {
    const token: string = jwt.sign(
      {
        uuid: user?.uuid,
        email: user?.email,
        type: user?.type,
      },
      this.secret,
      { expiresIn: expiresIn || "5d" }
    );
    return token;
  }

  /**
   * Validate the token that is received from the request
   * @param token the token that is being validated
   * @returns A user object or false
   */
  validateToken(token: string): JwtObj {
    try {
      return {
        suscess: true,
        data: jwt.verify(token, this.secret),
        error: [],
      };
    } catch (error: any) {
      return {
        suscess: false,
        error: [{ message: error.message }],
      };
    }
  }

  /**
   * This validate if the user exist in the token information
   * @param user the user getting from the token
   * @returns boolean
   */
  isAuth(user: any): boolean {
    if (!user) return false;
    return true;
  }

  /**
   * This validate if the request is from an Administartor user
   * @param user the user getting from the token
   * @returns boolean
   */
  isAdmin(user: any): boolean {
    if (!user) return false;
    if (user.type !== "admin") return false;
    return true;
  }

  /**
   * This validates if the user who is sending the request is the same user who is requesting the change
   * @param user the user getting from the token
   * @param uuid the uuid of the user that is requesting the change
   * @returns boolean
   */
  isTheUser(user: any, uuid: string): boolean {
    if (!user) return false;
    if (user.uuid !== uuid && !this.isAdmin(user)) return false;
    return true;
  }
}

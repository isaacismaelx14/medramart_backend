import { IResponse } from "../graphql/typeDefs";

export class Messages {
  error(msg: string): IResponse {
    return {
      error: [{ message: msg }],
      suscess: false,
    };
  }

  success(token?: string): IResponse {
    return {
      error: [],
      suscess: true,
      token,
    };
  }

  lauchAuthError = this.error("You are not authorized to perform this action");
}

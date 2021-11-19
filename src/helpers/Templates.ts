import { IContext } from "../app";
import { Messages } from "./messages";
import { Validator } from "./Validator";

export class Template extends Validator {
  private msg: Messages = new Messages();
  private isAcceptedAdmin = (context: IContext) => this.isAdmin(context.user);

  constructor() {
    super();
  }

  async adminAuth(context: IContext, next: (user: any) => {}) {
    if (!this.isAcceptedAdmin(context)) return this.msg.lauchAuthError;
    await next(context.user);
    return this.msg.success();
  }
}

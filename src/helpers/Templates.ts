import { IContext } from "../app";
import Auth from "../auth";
import { Messages } from "./messages";

export class Template extends Auth {
  private msg: Messages = new Messages();
  private isAcceptedAdmin = (context: IContext) => this.isAdmin(context.user);
  private isAcceptedUser = (context: IContext, uuid: string) =>
    this.isTheUser(context.user, uuid);

  constructor() {
    super();
  }

  async adminAuth(context: IContext, next: (user: any) => {}) {
    if (!this.isAcceptedAdmin(context)) return this.msg.lauchAuthError;
    await next(context.user);
    return this.msg.success();
  }

  async userAuth(context: IContext, uuid: string, next: (user: any) => {}) {
    if (!this.isAcceptedUser(context, uuid)) return this.msg.lauchAuthError;
    await next(context.user);
    return this.msg.success();
  }
}

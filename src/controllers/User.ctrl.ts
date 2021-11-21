import { Request, Response } from "express";
import { IContext } from "../app";
import Auth from "../auth";
import { Mailer } from "../config/mailer";
import { Users } from "../entity/users";
import { IResponse } from "../graphql/typeDefs";
import { GenerateID } from "../helpers/generateId";
import { activationMail } from "../helpers/mails";
import { Messages } from "../helpers/messages";
import { DecryptPassword, EncryptPassword } from "../helpers/passwords";
import { Template } from "../helpers/Templates";

export class UserController extends Messages {
  private mailer: Mailer = new Mailer();
  private auth: Auth = new Auth();
  private template: Template = new Template();

  private genarateUser = async (input: Users) => ({
    ...input,
    email: input.email.toLowerCase(),
    name: input.name.toLowerCase(),
    uuid: GenerateID("", {
      bytes: 5,
      useSeparators: false,
      useUpperCase: false,
    }),
    password: await EncryptPassword(input.password),
    accountCode: GenerateID("", {
      bytes: 12,
      useSeparators: false,
      useUpperCase: false,
    }),
  });

  constructor() {
    super();
    this.forgotPassword();
  }

  async signUp(input: Users) {
    const data: any = await this.genarateUser(input);
    await Users.save(data);
    await this.mailer.sendMail(activationMail(data));
    return this.success(data.accountCode);
  }

  async login(input: any): Promise<IResponse> {
    const { email, password } = input;
    const user = await Users.findOne({ where: { email } });
    if (!user) return this.error("User not found");
    const isValid = await DecryptPassword(password, user.password);
    if (!isValid) return this.error("Invalid password");

    return this.success(this.auth.generateToken(user));
  }

  async forgotPassword(input?: Users) {
    // const { email } = input;
    // const user = await Users.findOne({ where: { email } });
    // if (!user) return this.error("User not found");

  }

  async delete(input: Users, context: IContext) {
    return this.template.userAuth(context, input.uuid, async () => {
      const action = await Users.delete(input.uuid)
      if (action.affected === 0) return this.error("User not found");
      return this.success();
    });
  }

  validateCode(req: Request, res: Response) {
    const id: any = req.query.id;
    const salt = req.params.salt;
    Users.findOne({ where: { uuid: id } }).then((user) => {
      if (user?.active === false && user?.accountCode === salt) {
        res.send({ response: "valid" });
        Users.update({ uuid: id }, { active: true });
      } else if (user?.active === true) {
        res.send({ response: "already active" });
      } else {
        res.send({ response: "invalid" });
      }
    });
  }
}

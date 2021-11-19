import { Mailer } from "../config/mailer";
import { Users } from "../entity/users";
import { GenerateID } from "../helpers/generateId";
import { Messages } from "../helpers/messages";
import { EncryptPassword } from "../helpers/passwords";

export class UserController extends Messages {
  private mailer: Mailer = new Mailer();
  constructor() {
    super();
  }

  async signUp(input: any) {
    const data: Users = {
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
    };
    await Users.save(data);
    await this.mailer.sendMail({
      from: "Not Reply <testdevgmlc@gmail.com>",
      to: data.email,
      subject: "Welcome to MedraMart",
      html: `<h1>Welcome to MedraMart, ${data.name}</h1> 
            <p>Your account code is: ${data.accountCode}</p>
            <p>Please use this code to activate your account</p>
            <p>Thank you for joining us</p>
            <p>MedraMart</p>
          `,
    });
    return this.success(data.accountCode);
  }
}

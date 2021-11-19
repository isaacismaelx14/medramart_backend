import { IContext } from "../app";
import { Services } from "../entity/services";
import { Messages } from "../helpers/messages";
import { Template } from "../helpers/Templates";

export class ServiceController extends Messages {
  private template: Template = new Template();

  constructor() {
    super();
  }

  async create(input: Services, contex: IContext) {
    return this.template.adminAuth(contex, async (user: any) => {
      await Services.save<any>({
        ...input,
        createdBy: user.uuid,
      });
    });
  }

  update(input: Services, contex: IContext) {
    return this.template.adminAuth(contex, async (user: any) => {
      await Services.update(input.id, {
        ...input,
        updatedBy: user.uuid,
      });
    });
  }

  delete(input: Services, contex: IContext) {
    return this.template.adminAuth(contex, async (user: any) => {
      await Services.delete(input.id);
    });
  }
}

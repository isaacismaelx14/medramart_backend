import { Categories } from "../entity/categories";
import { IResponse } from "../graphql/typeDefs";
import { Messages } from "../helpers/messages";
import { Validator } from "../helpers/Validator";

export class CategoryCtrl extends Messages {
  private validator: Validator = new Validator();
  private isAccepted = (context: any) => this.validator.isAdmin(context.user);

  constructor() {
    super();
  }

  private async template(context: any, next: () => {}) {
    if (!this.isAccepted(context)) return this.lauchAuthError;
    await next();
    return this.success();
  }

  public getAll = async (): Promise<Categories[]> => await Categories.find();

  public create = async (input: any, context: any): Promise<IResponse> =>
    await this.template(context, async () => {
      Categories.save(input);
    });

  public update = async (input: any, context: any): Promise<IResponse> =>
    await this.template(context, async () => {
      Categories.update(input.id, input);
    });

  public delete = async (input: any, context: any): Promise<IResponse> =>
    await this.template(context, async () => {
      Categories.delete(input.id);
    });
}

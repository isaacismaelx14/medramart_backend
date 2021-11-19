import { IContext } from "../app";
import { Categories } from "../entity/categories";
import { IResponse } from "../graphql/typeDefs";
import { Messages } from "../helpers/messages";
import { Template } from "../helpers/Templates";

export class CategoryController extends Messages {
  private template: Template = new Template();

  constructor() {
    super();
  }

  public getAll = async (): Promise<Categories[]> => await Categories.find();

  public create = async (input: any, context: IContext): Promise<IResponse> =>
    await this.template.adminAuth(context, async () => {
      Categories.save(input);
    });

  public update = async (input: any, context: IContext): Promise<IResponse> =>
    await this.template.adminAuth(context, async () => {
      Categories.update(input.id, input);
    });

  public delete = async (input: any, context: IContext): Promise<IResponse> =>
    await this.template.adminAuth(context, async () => {
      Categories.delete(input.id);
    });
}

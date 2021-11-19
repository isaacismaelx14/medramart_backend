import { IContext } from "../app";
import { ServiceCtrl } from "../controllers/Service.ctrl";
import { Categories } from "../entity/categories";
import { Services } from "../entity/services";

const serviceCtrl = new ServiceCtrl();

export const ServiceResolvers = {
  Query: {
    services: async () => await Services.find(),
    service: async (_: any, { id }: Services) => await Services.findOne(id),
  },

  Mutation: {
    createService: (_: any, input: Services, context: IContext) =>
      serviceCtrl.create(input, context),
    updateService: async (_: any, input: Services, context: IContext) =>
      serviceCtrl.update(input, context),
    deleteService: async (_: any, input: Services, context: IContext) =>
      serviceCtrl.delete(input, context),
  },

  Service: {
    category: async ({ category }: Services) => {
      const cat = await Categories.findOne(category);
      return cat?.name;
    },
  },
};

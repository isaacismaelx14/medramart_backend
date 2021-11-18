import { Categories } from "../entity/categories";
import { Services } from "../entity/services";

export const ServiceResolvers = {
  Query: {
    services: async () => await Services.find(),
    service: async (_: any, { id }: Services) => await Services.findOne(id),
  },

  Mutation: {
    createService: async (_: any, input: Services) => {
      const service = await Services.create(input);
      await service.save();
      return service;
    },
    updateService: async (_: any, input: Services) => {
      Services.update(input.id, input);
      return true;
    },
    deleteService: async (_: any, { id }: Services) => {
      await Services.delete(id);
      return true;
    },
  },

  Service: {
    category: async ({ category }: Services) => {
      const cat = await Categories.findOne(category);
      return cat?.name;
    },
  },
};

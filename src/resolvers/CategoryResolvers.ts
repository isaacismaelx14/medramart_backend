import { Categories } from "../entity/categories";
import { Services } from "../entity/services";


export const CategoryResolvers = {
  Query: {
    categories: async () => await Categories.find(),
  },

  Category:{
  services: ({ id }: Categories) => Services.find({ category: id }),
}
};
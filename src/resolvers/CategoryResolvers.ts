import { CategoryCtrl } from "../controllers/Category.ctrl";
import { Categories } from "../entity/categories";
import { Services } from "../entity/services";

const categoryCtrl = new CategoryCtrl();

export const CategoryResolvers = {
  Query: {
    categories: async () => await categoryCtrl.getAll(),
  },

  Mutation: {
    createCategory: (_: any, input: any, context: any) =>
      categoryCtrl.create(input, context),

    updateCategory: (_: any, input: any, context: any) =>
      categoryCtrl.update(input, context),

    deleteCategory: (_: any, input: any, context: any) =>
      categoryCtrl.delete(input, context),
  },
  Category: {
    services: ({ id }: Categories) => Services.find({ category: id }),
  },
};

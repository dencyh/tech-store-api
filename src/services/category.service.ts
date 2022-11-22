import CategoryModel, { CategoryDocument } from "../model/category.model";

export function createCategory(input: Partial<CategoryDocument>) {
  return CategoryModel.create(input);
}

export function getCategories() {
  return CategoryModel.find();
}

export function findCategoryByType(type: string) {
  return CategoryModel.findOne({ type });
}

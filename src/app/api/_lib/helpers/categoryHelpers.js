import { Category } from "@/lib/models"
import * as extraFieldHelpers from "./extraFieldHelpers"
import * as subCategoryHelpers from "./subCategoryHelpers"


export const edit = async (category) => {
  const categoryUpdate = await Category.findById(category._id)
  categoryUpdate.name = category.name
  return categoryUpdate.save()

}

export const save = async (category) => {
  return await Category.create(category)
}


export const deleteById = async (categoryId) => {
  await Category.findByIdAndDelete(categoryId);
  subCategoryHelpers.deleteManyByCategory(categoryId)
  extraFieldHelpers.deleteManyByCategory(categoryId)
}
"use server"
import { SubCategory } from "@/lib/models";

export const saveSubCategories = async (subCategories, category) => {
  await subCategories.forEach(async subCategory => {
    subCategory.category = category
    if (subCategory._id) {
      await editSubCategory(subCategory)
    } else {
      await saveSubCategory(subCategory)
    }
  })
  await deleteSubCategorys(subCategories, category)
}

export const deleteSubCategorys = async (subCategories, category) => {
  const currentsSubCategories = await SubCategory.find({ category }).distinct('_id');
  const staySubCategory = subCategories.map(subCategory => subCategory._id)
  const idsToDelete = currentsSubCategories.filter(subCategory => !staySubCategory.includes(subCategory._id.toString()))
  await SubCategory.deleteMany({ _id: { $in: idsToDelete } })
}

export const editSubCategory = async (subCategory) => {
  const subCategoryUpdate = await SubCategory.findById(subCategory._id)
  subCategoryUpdate.name = subCategory.name
  subCategoryUpdate.icon = subCategory.icon
  subCategoryUpdate.color = subCategory.color

  return subCategoryUpdate.save()
}

export const saveSubCategory = async (subCategory) => {
  return await SubCategory.create(subCategory)
}

export const getSubCategoriesByCategory = async (category) => {
  try {
    const subCategories = await SubCategory.find({ category });
    return JSON.parse(JSON.stringify(subCategories))
  } catch (error) {
    console.error(error);
  }

}

export const getSubCategories = async () => {
  try {
    const subCategories = await SubCategory.find({});
    return JSON.parse(JSON.stringify(subCategories))
  } catch (error) {
    console.error(error);
  }
}

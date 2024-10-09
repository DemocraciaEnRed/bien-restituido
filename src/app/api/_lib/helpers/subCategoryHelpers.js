import { SubCategory } from "@/lib/models";
import { createSlug } from "@/lib/utils";


export async function createOrEdit(subCategories, category) {
  for await (const subCategory of subCategories) {
    try {
      subCategory.category = category;
      if (subCategory._id) {
        await edit(subCategory);
      } else {
        await save(subCategory);
      }
    } catch (err) {
      throw err;
    }
  }
}

export const deleteOnEdit = async (subCategories, category) => {
  const currentsSubCategories = await SubCategory.find({ category }).distinct('slug');
  const staySubCategory = subCategories.map(subCategory => {
    return createSlug(subCategory.category.name + " " + subCategory.name)
  });
  const slugToDelete = currentsSubCategories.filter(subCategory => !staySubCategory.includes(subCategory));
  await SubCategory.deleteMany({ slug: { $in: slugToDelete } });
};

export const edit = async (subCategory) => {
  try {
    const subCategoryUpdate = await SubCategory.findById(subCategory._id);
    subCategoryUpdate.category = subCategory.category;
    subCategoryUpdate.name = subCategory.name;
    subCategoryUpdate.icon = subCategory.icon;
    subCategoryUpdate.color = subCategory.color;
    return subCategoryUpdate.save();
  } catch (err) {
    throw err.message;
  }
};

export const save = async (subCategory) => {
  try {
    return await SubCategory.create(subCategory);
  } catch (err) {
    throw err.message;
  }
};


export const deleteManyByCategory = async (categoryId) => {
  await SubCategory.deleteMany({ category: categoryId })

}
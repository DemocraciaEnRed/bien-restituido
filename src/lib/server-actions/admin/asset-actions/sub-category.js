"use server"
import { SubCategory } from "@/lib/models";
import { createSlug } from "@/lib/utils";
import { isAuthotized } from "@/lib/utils/session-role";


export const saveSubCategories = async (subCategories, category) => {
  try {
    await createOrEdit(subCategories, category)
    await deleteSubCategorys(subCategories, category);
  } catch (err) {
    throw err;
  }
};

async function createOrEdit(subCategories, category) {
  for await (const subCategory of subCategories) {
    try {
      subCategory.category = category;
      if (subCategory._id) {
        await editSubCategory(subCategory);
      } else {
        await saveSubCategory(subCategory);
      }
    } catch (err) {
      throw err;
    }
  }
}

export const deleteSubCategorys = async (subCategories, category) => { 
  const currentsSubCategories = await SubCategory.find({ category }).distinct('slug');
  const staySubCategory = subCategories.map(subCategory => {
    return createSlug(subCategory.category.name + " " + subCategory.name)
  });
  const slugToDelete = currentsSubCategories.filter(subCategory => !staySubCategory.includes(subCategory));
  await SubCategory.deleteMany({ slug: { $in: slugToDelete } });
};

export const editSubCategory = async (subCategory) => {
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

export const saveSubCategory = async (subCategory) => {
  try {
    return await SubCategory.create(subCategory);
  } catch (err) {
    throw err.message;
  }
};

export const getSubCategoriesByCategory = async (category) => {
  await isAuthotized()
  try {
    const subCategories = await SubCategory.find({ category });
    return JSON.parse(JSON.stringify(subCategories))
  } catch (error) {
    console.error(error);
  }

}

export const getSubCategories = async () => {
  await isAuthotized()
  try {
    const subCategories = await SubCategory.find({});
    return JSON.parse(JSON.stringify(subCategories))
  } catch (error) {
    console.error(error);
  }
}

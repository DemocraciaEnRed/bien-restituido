"use server"
import { redirect } from "next/navigation"
import { saveSubCategories } from "./sub-category";
import { saveExtraFields } from "./extra-fields";
import { Category, ExtraField, SubCategory } from "@/lib/models";
import { revalidatePath } from "next/cache";

export const saveCompleteCategory = async (category, subCategories, fields) => {
    let success = false
    try {
        const categoryDoc = category._id ? await editCategory(category) : await saveCategory(category);
        await saveSubCategories(subCategories, categoryDoc)
        await saveExtraFields(fields, categoryDoc)
        success = true
    } catch (error) {
        await deleteCategoryByName(category)
        throw new Error(error)
    }
    if (success) redirect('/admin/configuracion')
}

export const editCategory = async (category) => {
    const categoryUpdate = await Category.findById(category._id)
    categoryUpdate.name = category.name
    return categoryUpdate.save()

}

export const saveCategory = async (category) => {
    return await Category.create(category)
}

export const deleteCategoryByName = async (categoryId) => {
    if (!categoryId._id) {
        const category = await Category.findOne(categoryId)
        if (category) deleteCategoryById(category._id)
    }
}

export const deleteCategoryById = async (categoryId) => {
    try {
        await Category.findByIdAndDelete(categoryId);
        await SubCategory.deleteMany({ category: categoryId })
        await ExtraField.deleteMany({ category: categoryId })

    } catch (err) {
        console.log(err);
    }
    revalidatePath(`/admin/configuracion`)

}

export const getCategories = async () => {
    try {
        const categories = await Category.find({});
        return JSON.parse(JSON.stringify(categories))
    } catch (error) {
        console.error(error);
    }
}


export const getCategoryBySlug = async (slug) => {
    try {
        const category = await Category.findOne({ slug });
        return JSON.parse(JSON.stringify(category))

    } catch (err) {
        console.error(err);
    }

}

export const getCategoryById = async (id) => {
    try {
        const category = await Category.findOne({ _id: id });
        return JSON.parse(JSON.stringify(category))

    } catch (err) {
        console.error(err);
    }
}

export const getCategoryByName = async (name) => {
    try {
        const category = await Category.findOne({ name });
        return JSON.parse(JSON.stringify(category))

    } catch (err) {
        console.error(err);
    }
}


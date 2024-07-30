"use server"
import { redirect } from "next/navigation"
import { saveSubCategories } from "./sub-category";
import { saveExtraFields } from "./extra-fields";
import { Category } from "@/lib/models";

export const saveCompleteCategory = async (category, subCategories, fields) => {
    try {
        const categoryDoc = category._id ? await editCategory(category) : await saveCategory(category);
        await saveSubCategories(subCategories, categoryDoc)
        await saveExtraFields(fields, categoryDoc)
    } catch (error) {
        console.error(error);
    }
    redirect('/admin/categoria')
}

export const editCategory = async (category) => {
    const categoryUpdate = await Category.findById(category._id)
    categoryUpdate.name = category.name
    return categoryUpdate.save()

}

export const saveCategory = async (category) => {
    return await Category.create(category)
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
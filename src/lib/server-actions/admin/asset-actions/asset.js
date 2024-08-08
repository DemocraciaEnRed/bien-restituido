"use server"
import { Asset } from "@/lib/models";
import { isAuthotized } from "@/lib/utils/sessions";
import { getCategoryById } from "./category";
import { getExtraFieldsByCategory } from "./extra-fields";

export const saveAsset = async (formData) => {
    await isAuthotized()
    try {
        // let errorAsset = {};
        // const extraFields = await getExtraFieldsByCategory(formData.category)
        // extraFields.forEach(field => {
        //     if (field.required && !formData[`extras.${field.slug}`]) errorAsset.fieldRequired = `extras.${field.slug}`
        // })
        // if (errorAsset) throw errorAsset

        const asset = await Asset.create(formData);
        return 'ok'
    } catch (error) {
        // console.log(error);

        throw new Error(JSON.stringify(error))
    }

}

export async function getAssets() {
    await isAuthotized()
        const assets = await Asset.find({}).populate('subCategory')
    return JSON.parse(JSON.stringify(assets))

}       
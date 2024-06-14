"use server"
import AssetCategory from "@/lib/models/asset-category"
import { redirect } from "next/navigation"
export const saveAssetCategory = async (_currentState, formData) => {
    try {
        let name = formData.get('name')
        let extras = JSON.parse(formData.get('extrasFields'))
        const assetCategory = await AssetCategory.create({ name, extras });
    } catch (error) {
        console.error(error);
    }
    redirect('/admin/tipo-bien')

}

export const getAssetCategory = async () => {
    try {
        const assetCategories = await AssetCategory.find({});
        return JSON.parse(JSON.stringify(assetCategories))
    } catch (error) {
        console.error(error);
    }

}

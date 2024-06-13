"use server"
import AssetType from "@/lib/models/asset-type"
import { redirect } from "next/navigation"
export const saveAssetType = async (_currentState, formData) => {
    try {
        let name = formData.get('name')
        let extras = JSON.parse(formData.get('extrasFields'))
        const assetType = await AssetType.create({ name, extras });
    } catch (error) {
        console.error(error);
    }
    redirect('/admin/tipo-bien')

}

export const getAssetType = async () => {
    try {
        const assetTypes = await AssetType.find({});
        return JSON.parse(JSON.stringify(assetTypes))
    } catch (error) {
        console.error(error);
    }

}

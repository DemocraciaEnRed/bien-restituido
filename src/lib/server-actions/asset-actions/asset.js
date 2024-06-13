"use server"
import Asset from "@/lib/models/asset"
export const saveAsset = async (formData) => {
    try {
        const asset = await Asset.create(formData);
    } catch (error) {
        throw new Error('Failed to create task' + error)
    }

}

export const getAssets = async () => {
    try {
        const assets = await Asset.find({})
        return JSON.parse(JSON.stringify(assets))
    } catch (error) {
        return error;
    }

}
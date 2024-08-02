"use server"
import { Asset } from "@/lib/models";
import { isAuthotized } from "@/lib/utils/sessions";

export const saveAsset = async (formData) => {
    try {
        await isAuthotized()
        const asset = await Asset.create(formData);
        return 'ok'
    } catch (error) {
        throw new Error('Failed to create asset' + error)
    }

}

export async function getAssets() {
    try {
        await isAuthotized()
        const assets = await Asset.find({}).populate('subCategory')
        return JSON.parse(JSON.stringify(assets))
    } catch (error) {
        throw 'Failed to get assets ' + error.message

    }

}       
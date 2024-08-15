"use server"
import { Asset } from "@/lib/models";
import { isAuthotized } from "@/lib/utils/sessions";
import { getCategoryById } from "./category";
import { getExtraFieldsByCategory } from "./extra-fields";

export const saveAsset = async (formData) => {
    await isAuthotized()
    try {
        const asset = await Asset.create(formData);
        return 'ok'
    } catch (error) {
        throw error
    }

}

export const editAsset = async (id, formData) => {
    await isAuthotized()
    try {
        const asset = await Asset.findById(id);
        asset.overwrite(formData)
        asset.save()
        return 'ok'
    } catch (error) {
        throw error
    }

}

export async function getAssets() {
    await isAuthotized()
        const assets = await Asset.find(_filter).populate('category').populate('subCategory')
    return JSON.parse(JSON.stringify(assets))

}       


export const getAssetById = async (id) => {
    await isAuthotized()
    try {
        const category = await Asset.findOne({ _id: id });
        return JSON.parse(JSON.stringify(category))

    } catch (err) {
        console.error(err);
    }
}
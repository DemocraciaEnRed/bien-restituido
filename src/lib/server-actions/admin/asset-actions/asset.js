"use server"
import { Asset } from "@/lib/models";
import { verifiedUser } from "../user/post-data";
import { userMe } from "../user/auth-actions";

export const saveAsset = async (formData) => {
    try {
        const { role } = await userMe()
        console.log(role);
        if (role !== 'admin') throw new Error('no estas autorizado')
        const asset = await Asset.create(formData);
        return 'ok'
    } catch (error) {
        throw new Error('Failed to create task' + error)
    }

}

export const getAssets = async () => {
    try {
        // const { role } = await userMe()
        // if (role !== 'admin') throw new Error('no estas autorizado')
        const assets = await Asset.find({}).populate('subCategory')
        return JSON.parse(JSON.stringify(assets))
    } catch (error) {
        throw 'Failed to get assets ' + error.message
    }

}       
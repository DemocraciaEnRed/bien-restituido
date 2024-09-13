"use server"
import { Asset, ExtraField } from "@/lib/models";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { showCardOptions } from "@/lib/utils/constants";
import dbConnect from "@/lib/db/dbConnect";
import { isAuthotized } from "@/lib/utils/session-role";
import fetchData from "@/lib/utils/get-data";
import axiosServices from "@/lib/utils/axios";

export const saveAsset = async (formData) => {
    try {
        let res = await axiosServices.post(`/api/asset`, formData);

        const { data } = res;
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        console.log(error);

        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }
}

export const editAsset = async (id, formData) => {
    try {
        let res = await axiosServices.put(`/api/asset/${id}`, formData);
        const { data } = res;
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        console.log(error);
        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }

}


export const downloadAssets = async (_filter) => {
    await dbConnect()
    await isAuthotized()
    let query = _filter

    if (_filter.search) {
        query = {
            ...query,
            $or: [
                { juzgado: { "$regex": _filter.search, "$options": "i" } },
                { causeCoverSheet: { "$regex": _filter.search, "$options": "i" } }
            ]
        };
        if (mongoose.Types.ObjectId.isValid(_filter.search)) {
            query.$or.push({ _id: _filter.search });
        }
    }
    delete query.search
    const assets = await Asset.find(query)
        .populate('category', 'name -_id')
        .populate('subCategory', 'name -_id').lean()

    for (const asset of assets) {
        let extras = {};
        const category = asset.category.name;
        const subCategory = asset.subCategory.name
        for (const extraKey of Object.keys(asset.extras)) {
            const key = await ExtraField.findById(extraKey);
            const value = asset.extras[extraKey];
            if (!key.hiddenDownload) asset[key.name] = value;
        }

        asset[`destino-informacion`] = JSON.stringify(asset.destinationInfo);

        if (asset.thirdParties) asset['terceros-involucrados'] = JSON.stringify(asset.third)

        asset.category = category;
        asset.subCategory = subCategory;
        delete asset.thirdParties
        delete asset.third
        delete asset.destinationInfo
        delete asset.extras
        delete asset.updatedAt
        delete asset.createdAt
        delete asset.deletedAt
        delete asset.__v
    }

    return JSON.parse(JSON.stringify(assets))

}


export const archiveAsset = async (id) => {
    revalidatePath(`/admin/bien`)
    return await fetchData(`/api/asset/archive/${id}`)

}



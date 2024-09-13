import { Asset, ExtraField } from "@/lib/models";
import { listAssets } from "../helpers/assetHelpers";
import { messages } from "@/lib/utils/messages";

import mongoose from "mongoose";
// import { userRoles } from "@/lib/utils/constants";

export const list = async function (req, res) {
  try {
    let query = req.query
    let { page, limit } = req.query

    if (req.query.search) {
      query = {
        ...query,
        $or: [
          { juzgado: { "$regex": req.query.search, "$options": "i" } },
          { causeCoverSheet: { "$regex": req.query.search, "$options": "i" } }
        ],

      };
      if (mongoose.Types.ObjectId.isValid(req.query.search)) {
        query.$or.push({ _id: req.query.search });
      }
    }
    query.archivedAt = req.query.archivedAt ? { $ne: null } : null
    delete query.search
    delete query.page
    delete query.limit


    const output = await listAssets(page, limit, query)


    return res.status(200).json(output);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}


export const get = async function (req, res) {

  try {
    const assetId = req.params.assetId;
    const userLogged = req.user;
    let querySelect = {
      __v: false
    }
    // const querySelectForAdmins = {
    //   __v: false
    // }

    let queryProjection = querySelect;

    // if (userLogged && userLogged.role == userRoles.ADMIN) {
    //   queryProjection = querySelectForAdmins;
    // }

    const asset = await Asset.findById(assetId)

    if (!asset) return res.status(401).json({ message: messages.assets.error.notFound });

    return res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
};

export const create = async function (req, res) {
  try {

    const data = req.data
    const asset = await Asset.create(data);

    return res.status(200).json(asset);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}

export const update = async function (req, res) {
  try {
    const assetId = req.params.assetId;
    const data = req.data
    const asset = await Asset.findById(assetId);
    asset.overwrite(data)
    asset.save()
    return res.status(200).json(asset);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}

export const archive = async function (req, res) {
  try {
    const assetId = req.params.assetId;
    const now = new Date()
    const asset = await Asset.findByIdAndUpdate(assetId, { archivedAt: now })
    return res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
}

export const download = async function (req, res) {
  try {

    let query = req.query

    if (req.query.search) {
      query = {
        ...query,
        $or: [
          { juzgado: { "$regex": req.query.search, "$options": "i" } },
          { causeCoverSheet: { "$regex": req.query.search, "$options": "i" } }
        ]
      };
      if (mongoose.Types.ObjectId.isValid(req.query.search)) {
        query.$or.push({ _id: req.query.search });
      }
    }
    query.archivedAt = req.query.archivedAt ? { $ne: null } : null
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

    return res.status(200).json(assets);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
}
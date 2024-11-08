import { Asset, ExtraField } from "@/lib/models";
import { listAssets } from "../helpers/assetHelpers";
import { messages } from "@/lib/utils/messages";

import mongoose from "mongoose";
import { userRoles } from "@/lib/utils/constants";
import { getFileS3, uploadFileS3 } from "@/lib/utils/s3-client";
import logger from "@/lib/utils/debugger";

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

    logger('asset', 'serving assets')
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

    let asset = await Asset.findById(assetId)
    asset = asset.toObject()
    if (asset.cautelaResolution) asset.cautelaResolutionURL = await getFileS3(asset.cautelaResolution, 'cautelaResolution')
    if (asset.confiscatedResolution) asset.confiscatedResolutionURL = await getFileS3(asset.confiscatedResolution, 'confiscatedResolution')
    if (asset.destinationResolution) asset.destinationResolutionURL = await getFileS3(asset.destinationResolution, 'destinationResolution')
    if (asset.assetImage) asset.assetImageURL = await getFileS3(asset.assetImage, 'assetImage')



    if (!asset) return res.status(401).json({ message: messages.assets.error.notFound });
    logger('asset', `serving asset ${assetId}`)
    return res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
};

export const create = async function (req, res) {
  try {
    const data = req.data

    Object.keys(data).forEach(async (key) => {
      if (typeof data[key] === 'object') {
        if ('size' in data[key] && 'type' in data[key]) {
          if (data[key].size > 0) {
            uploadFileS3(data[key], key)
            data[key] = data[key].name
          } else {
            data[key] = null
          }
        }
      }
    })

    const asset = await Asset.create(data);
    logger('asset', `create asset ${asset._id}`)
    return res.status(200).json({ asset });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}

export const update = async function (req, res) {
  try {
    const assetId = req.params.assetId;
    const data = req.data

    Object.keys(data).forEach(async (key) => {
      if (typeof data[key] === 'object') {
        if ('size' in data[key] && 'type' in data[key]) {
          if (data[key].size > 0) {
            uploadFileS3(data[key], key)
            data[key] = data[key].name
          } else {
            data[key] = null
          }
        }
      }
    })


    const asset = await Asset.findById(assetId);
    asset.overwrite(data)
    asset.save()
    logger('asset', `update asset ${assetId}`)
    return res.status(200).json({ asset });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}

export const archive = async function (req, res) {
  try {
    const assetId = req.params.assetId;
    const now = new Date()
    const asset = await Asset.findById(assetId)
    if (asset.archivedAt) {
      asset.set({ archivedAt: null })
    } else {
      asset.set({ archivedAt: now })
    }
    await asset.save()
    logger('asset', `toggle archive asset ${assetId}`)
    return res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
}

export const publish = async function (req, res) {
  try {
    const assetId = req.params.assetId;
    const now = new Date()
    const asset = await Asset.findById(assetId)
    if (asset.publish) {
      asset.set({ publish: false })
    } else {
      asset.set({ publish: true })
    }
    await asset.save()

    logger('asset', `toggle publish asset ${assetId}`)
    return res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
}

export const download = async function (req, res) {
  try {

    let query = req.query
    const userLogged = req.user;

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

    let querySelect = {
      __v: false,
      thirdParties: false,
      causeNumber: false,
      third: false,
      ownerName: false,
      ownerLastName: false,
      ownerIdType: false,
      ownerNumberId: false,
      ownerAddress: false,

    }

    const querySelectForAdmins = {
      __v: false
    }

    let queryProjection = querySelect;

    if (userLogged && userLogged.role == userRoles.ADMIN) {
      queryProjection = querySelectForAdmins;
    }
    const assets = await Asset.find(query, queryProjection)
      .populate('category', 'name -_id')
      .populate('subCategory', 'name -_id').lean()


    for (const asset of assets) {
      let extras = {};
      const category = asset.category.name;
      const subCategory = asset.subCategory.name
      for (const extraKey of Object.keys(asset.extras)) {
        const key = await ExtraField.findById(extraKey);
        const value = asset.extras[extraKey];
        if (!req.user || (req.user && req.user.role !== userRoles.ADMIN)) {
          if (!key.hiddenDownload) asset[key.name] = value;
        }
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


    logger('asset', `download database assets`)

    return res.status(200).json(assets);

  } catch (error) {
    console.log(error);

    // console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
}
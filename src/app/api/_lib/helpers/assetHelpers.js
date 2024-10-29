import { Asset, ExtraField } from "@/lib/models";
import { showCardOptions } from "@/lib/utils/constants";
import { getFileS3 } from "@/lib/utils/s3-client";


export const listAssets = async (page = 1, limit = 10, query = null, sort = 'createdAt') => {
  try {
    // get the assets by page
    const assets = await Asset.find(query).sort(sort).populate('category').populate('subCategory').skip((page - 1) * limit).limit(limit)
    let assetList = []
    for (const asset of assets) {
      const assetPopulate = asset.toObject()

      let extras = {
        [showCardOptions.EXPANDED.value]: {},
        [showCardOptions.ALLWAYS.value]: {}
      };

      for (const extraKey of Object.keys(asset.extras)) {

        const key = await ExtraField.findById(extraKey);
        if (key) {
          const value = {
            type: key.type,
            value: asset.extras[extraKey]
          }
          if (key.showCard === showCardOptions.EXPANDED.value) extras[showCardOptions.EXPANDED.value][key.name] = value;
          else extras[showCardOptions.ALLWAYS.value][key.name] = value;
        }
      }
      assetPopulate.extras = extras;

      let assetImageURL

      if (asset.assetImage) assetImageURL = await getFileS3(asset.assetImage)
      assetPopulate.assetImageURL = assetImageURL
      assetList.push(assetPopulate)
    }


    // get pagination metadata
    const total = await Asset.countDocuments(query);
    const pages = Math.ceil(total / limit); // round up to the next integer
    const nextPage = page < pages ? page + 1 : null; // if there is no next page, return null
    const prevPage = page > 1 ? page - 1 : null; // if there is no previous page, return null

    // return the users with pagination metadata
    return {
      assets: assetList,
      page,
      total,
      pages,
      nextPage,
      prevPage
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}



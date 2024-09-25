import { Asset, ExtraField } from "@/lib/models";
import { showCardOptions } from "@/lib/utils/constants";


export const listAssets = async (page = 1, limit = 10, query = null) => {
  try {
    // get the assets by page
    const assets = await Asset.find(query).populate('category').populate('subCategory').skip((page - 1) * limit).limit(limit)
    for (const asset of assets) {
      let extras = {
        [showCardOptions.EXPANDED.value]: {},
        [showCardOptions.ALLWAYS.value]: {}
      };

      for (const extraKey of Object.keys(asset.extras)) {

        const key = await ExtraField.findById(extraKey);
        const value = asset.extras[extraKey];
        if (key) {
          if (key.showCard === showCardOptions.EXPANDED.value) extras[showCardOptions.EXPANDED.value][key.name] = value;
          else extras[showCardOptions.ALLWAYS.value][key.name] = value;
        }
      }
      asset.extras = extras;
    }

    // get pagination metadata
    const total = await Asset.countDocuments(query);
    const pages = Math.ceil(total / limit); // round up to the next integer
    const nextPage = page < pages ? page + 1 : null; // if there is no next page, return null
    const prevPage = page > 1 ? page - 1 : null; // if there is no previous page, return null

    // return the users with pagination metadata
    return {
      assets,
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
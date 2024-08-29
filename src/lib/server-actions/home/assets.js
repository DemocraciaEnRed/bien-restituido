"use server"
import dbConnect from "@/lib/db/dbConnect";
import { Asset, ExtraField } from "@/lib/models";
import { showCardOptions } from "@/lib/utils/constants";


export async function getAssets(_filter) {
  await dbConnect()
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

  const assets = await Asset.find(query).populate('category').populate('subCategory')
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

  return JSON.parse(JSON.stringify(assets))
}

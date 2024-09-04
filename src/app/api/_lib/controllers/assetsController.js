import { listAssets } from "../helpers/assetHelpers";
import mongoose from "mongoose";

export const list = async function (req, res) {
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
}



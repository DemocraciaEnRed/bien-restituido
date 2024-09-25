import { messages } from "@/lib/utils/messages";

// import mongoose from "mongoose";
// import { userRoles } from "@/lib/utils/constants";
import { SubCategory } from "@/lib/models";
import { isObjectId } from "@/lib/utils";

export const list = async function (req, res) {
  try {
    let query = req.query
    // let { page, limit } = req.query

    const output = await SubCategory.find(query)

    return res.status(200).json(output);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}


export const get = async function (req, res) {

  try {
    const subCategoryId = req.params.subCategoryId;
    const userLogged = req.user;
    const isMongoId = isObjectId(subCategoryId);
    let query = {};
    if (isMongoId) {
      // the subCategory is a MongoDB ObjectId
      query = { _id: subCategoryId };
    } else {
      // the subCategory is a slug
      query = { slug: subCategoryId };
    }
    let querySelect = {
      __v: false
    }
    // const querySelectForAdmins = {
    //   __v: false
    // }

    // let queryProjection = querySelect;

    // if (userLogged && userLogged.role == userRoles.ADMIN) {
    //   queryProjection = querySelectForAdmins;
    // }

    const subCategory = await SubCategory.findOne(query)

    if (!subCategory) return res.status(401).json({ message: messages.subCategory.error.notFound });

    return res.status(200).json(subCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
};
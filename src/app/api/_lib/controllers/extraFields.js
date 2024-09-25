import { messages } from "@/lib/utils/messages";

// import mongoose from "mongoose";
// import { userRoles } from "@/lib/utils/constants";
import { ExtraField } from "@/lib/models";
import { isObjectId } from "@/lib/utils";

export const list = async function (req, res) {
  try {
    let query = req.query
    // let { page, limit } = req.query

    const output = await ExtraField.find(query)

    return res.status(200).json(output);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}


export const get = async function (req, res) {

  try {
    const extraFieldId = req.params.extraFieldId;
    const userLogged = req.user;
    const isMongoId = isObjectId(extraFieldId);
    let query = {};
    if (isMongoId) {
      // the extraField is a MongoDB ObjectId
      query = { _id: extraFieldId };
    } else {
      // the extraField is a slug
      query = { slug: extraFieldId };
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

    const extraField = await ExtraField.findOne(query)

    if (!extraField) return res.status(401).json({ message: messages.extraField.error.notFound });

    return res.status(200).json(extraField);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
};
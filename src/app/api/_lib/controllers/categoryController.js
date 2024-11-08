import { messages } from "@/lib/utils/messages";

import mongoose from "mongoose";
import { userRoles } from "@/lib/utils/constants";
import { Category } from "@/lib/models";
import { isObjectId, parseCategoryForm } from "@/lib/utils";
import * as categoryHelpers from "../helpers/categoryHelpers";
import * as subCategoryHelpers from "../helpers/subCategoryHelpers";
import * as extraFieldHelpers from "../helpers/extraFieldHelpers";
import logger from "@/lib/utils/debugger";

export const list = async function (req, res) {
  try {
    let query = req.query
    let { page, limit } = req.query

    const output = await Category.find({})

    logger('category', 'serving categories')
    return res.status(200).json(output);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: messages.error.default })
  }
}


export const get = async function (req, res) {

  try {
    const categoryId = req.params.categoryId;
    const userLogged = req.user;
    const isMongoId = isObjectId(categoryId);
    let query = {};
    if (isMongoId) {
      // the category is a MongoDB ObjectId
      query = { _id: categoryId };
    } else {
      // the category is a slug
      query = { slug: categoryId };
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

    const category = await Category.findOne(query)

    if (!category) return res.status(401).json({ message: messages.category.error.notFound });
    logger('category', `serving category ${categoryId}`)
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.error.default });
  }
};


export const create = async function (req, res) {

  try {
    const data = req.data

    const { category, subCategories, extras } = parseCategoryForm(data)

    const categoryDoc = category._id ? await categoryHelpers.edit(category) : await categoryHelpers.save(category);
    await subCategoryHelpers.createOrEdit(subCategories, categoryDoc)
    await subCategoryHelpers.deleteOnEdit(subCategories, categoryDoc)
    await extraFieldHelpers.createOrEdit(extras, categoryDoc)
    await extraFieldHelpers.deleteOnEdit(extras, categoryDoc)

    logger('category', 'create category')
    return res.status(200).json({ message: '0k' });
  } catch (error) {
  }
};

export const deleteCategory = async function (req, res) {

  try {
    const categoryId = req.params.categoryId;

    categoryHelpers.deleteById(categoryId)
    logger('category', 'delete category')
    return res.status(200).json({ message: '0k' });
  } catch (error) {
  }
};
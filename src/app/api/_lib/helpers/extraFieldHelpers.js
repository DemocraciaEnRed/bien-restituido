import { ExtraField } from "@/lib/models";
import { createSlug } from "@/lib/utils";
import { uploadFileS3 } from "@/lib/utils/s3-client";


export async function createOrEdit(fields, category) {
  for (const field of fields) {
    try {
      field.category = category;
      if (field._id) {
        await edit(field)
      } else {
        await save(field)

      }
    } catch (err) {
      throw err;
    }
  }
}

export const deleteOnEdit = async (fields, category) => {
  const currentsExtraFields = await ExtraField.find({ category }).distinct('slug');
  const stayExtrafield = fields.map(field => {
    return createSlug(field.category.name + " " + field.name)
  })
  const slugToDelete = currentsExtraFields.filter(field => !stayExtrafield.includes(field))
  await ExtraField.deleteMany({ slug: { $in: slugToDelete } })
}

export const edit = async (field) => {
  try {
    let extraField = await ExtraField.findById(field._id)
    const { name, type, description, required, showCard, hiddenDownload, category, selectablesOptions } = field
    if (selectablesOptions) {
      if (selectablesOptions.type === "text/csv") {
        await uploadFileS3(field.selectablesOptions)
        extraField.selectablesOptions = selectablesOptions.name
      } else {
        extraField.selectablesOptions = selectablesOptions
      }
    }
    extraField.category = category
    extraField.name = name
    extraField.type = type
    extraField.description = description
    extraField.required = required
    extraField.showCard = showCard
    extraField.hiddenDownload = hiddenDownload
    await extraField.save()
  } catch (err) {
    throw err.message
  }
}

export const save = async (field) => {
  try {
    if (field.selectablesOptions && field.selectablesOptions.type === "text/csv") {
      await uploadFileS3(field.selectablesOptions)
      field.selectablesOptions = field.selectablesOptions.name
    }
    await ExtraField.create(field)
  } catch (err) {
    throw err.message
  }
}

export const deleteManyByCategory = async (categoryId) => {
  await ExtraField.deleteMany({ category: categoryId })
}
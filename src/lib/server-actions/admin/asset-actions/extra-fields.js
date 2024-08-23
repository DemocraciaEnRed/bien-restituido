"use server"
import { ExtraField } from "@/lib/models";
import { createSlug } from "@/lib/utils";
import { isAuthotized } from "@/lib/utils/session-role";


export const saveExtraFields = async (fields, category) => {

  try {
    for (const field of fields) {
      try {
        field.category = category;
        if (field._id) {
          await editExtraField(field)
        } else {
          await saveExtraField(field)

        }
      } catch (err) {
        throw err;
      }
    }
    await deleteExtraFields(fields, category)
  } catch (err) {
    throw err
  }
}

export const deleteExtraFields = async (fields, category) => {
  const currentsExtraFields = await ExtraField.find({ category }).distinct('slug');
  const stayExtrafield = fields.map(field => {
    return createSlug(field.category.name + " " + field.name)
  })
  const slugToDelete = currentsExtraFields.filter(field => !stayExtrafield.includes(field))
  await ExtraField.deleteMany({ slug: { $in: slugToDelete } })
}

export const editExtraField = async (field) => {
  try {
    let extraField = await ExtraField.findById(field._id)
    const { name, type, description, required, showCard, hiddenDownload, category } = field
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

export const saveExtraField = async (field) => {
  try {
    return await ExtraField.create(field)
  } catch (err) {
    throw err.message
  }
}

export const getExtraFieldsByCategory = async (category) => {
  await isAuthotized()
  try {
    const extraFields = await ExtraField.find({ category });
    return JSON.parse(JSON.stringify(extraFields))
  } catch (error) {
    console.error(error);
  }

}

export const getExtraFields = async () => {
  await isAuthotized()
  try {
    const extraFields = await ExtraField.find({});
    return JSON.parse(JSON.stringify(extraFields))
  } catch (error) {
    console.error(error);
  }
}

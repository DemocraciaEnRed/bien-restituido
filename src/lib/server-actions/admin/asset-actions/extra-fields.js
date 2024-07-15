"use server"
import { ExtraField } from "@/lib/models";

export const saveExtraFields = async (fields, category) => {
  await fields.forEach(async field => {
    field.category = category
    if (field._id) {
      await editExtraField(field)
    } else {
      await saveExtraField(field)
    }
  })
  await deleteExtraFields(fields, category)

}

export const deleteExtraFields = async (fields, category) => {
  const currentsExtraFields = await ExtraField.find({ category }).distinct('_id');
  const stayExtrafield = fields.map(field => field._id)
  const idsToDelete = currentsExtraFields.filter(field => !stayExtrafield.includes(field._id.toString()))
  await ExtraField.deleteMany({ _id: { $in: idsToDelete } })
}

export const editExtraField = async (field) => {
  let extraField = await ExtraField.findById(field._id)
  const { name, type, description, required, showCard, hiddenDownload } = field
  extraField.name = name
  extraField.type = type
  extraField.description = description
  extraField.required = required
  extraField.showCard = showCard
  extraField.hiddenDownload = hiddenDownload
  await extraField.save()
}

export const saveExtraField = async (field) => {
  return await ExtraField.create(field)
}

export const getExtraFieldsByCategory = async (category) => {
  try {
    const extraFields = await ExtraField.find({ category });
    return JSON.parse(JSON.stringify(extraFields))
  } catch (error) {
    console.error(error);
  }

}

export const getExtraFields = async () => {
  try {
    const extraFields = await ExtraField.find({});
    return JSON.parse(JSON.stringify(extraFields))
  } catch (error) {
    console.error(error);
  }
}

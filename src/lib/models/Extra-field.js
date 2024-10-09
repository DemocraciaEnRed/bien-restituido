import mongoose from "mongoose";
import { createSlug } from "../utils";
import { fieldsInputTypes, showCardOptions } from "../utils/constants";
const Schema = mongoose.Schema

export const ExtraFieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 255,
      required: [true, "extra field name is required"],
    },
    type: {
      type: String,
      enum: fieldsInputTypes.map(field => field.type),
      default: 'text'
    },
    description: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    showCard: {
      type: String,
      enum: Object.values(showCardOptions).map(option => option.value),
      default: showCardOptions.ALLWAYS.value
    },
    hiddenDownload: {
      type: Boolean,
      default: false
    },
    slug: {
      type: String,
      unique: true,
    },
    selectablesOptions: {
      type: String
    },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

// Middleware pre-save para generar el slug
ExtraFieldSchema.pre('save', function (next) {
    let toSlug = this.category.name + " " + this.name
    this.slug = createSlug(toSlug)

  next();
});


const ExtraField = mongoose.models.ExtraField || mongoose.model("ExtraField", ExtraFieldSchema);
export default ExtraField

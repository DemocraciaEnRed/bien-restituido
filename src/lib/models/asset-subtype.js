import mongoose from "mongoose";
import { createSlug } from "../utils";
const Schema = mongoose.Schema


export const AssetSubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 255,
      required: [true, "AssetSubCategory name is required"],
    },
    slug: {
      type: String,
      unique: true,
    },
    type: { type: mongoose.Types.ObjectId, ref: 'AssetCategory' },
    extras: Schema.Types.Mixed,
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);


AssetSubCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = createSlug(this.name)
  }
  next();
});

export default mongoose.models.AssetSubCategory || mongoose.model("AssetSubCategory", AssetSubCategorySchema);

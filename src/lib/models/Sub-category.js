import mongoose from "mongoose";
import { createSlug } from "../utils";
const Schema = mongoose.Schema


export const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 255,
      required: [true, "SubCategory name is required"],
    },
    icon: {
      type: String,
      required: [true, "SubCategory icon is required"]
    },
    color: {
      type: String,
      required: [true, "SubCategory color is required"]
    },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    slug: {
      type: String,
      unique: true,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);


SubCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    let toSlug = this.category.name + " " + this.name
    this.slug = createSlug(toSlug)
  }
  next();
});

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory

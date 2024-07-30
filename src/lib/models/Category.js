import mongoose from "mongoose";
import { createSlug } from "../utils";
const Schema = mongoose.Schema

export const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 255,
            required: [true, "asset category name is required"],
        },
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

// Middleware pre-save para generar el slug
CategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = createSlug(this.name)
    }
    next();
});


const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category

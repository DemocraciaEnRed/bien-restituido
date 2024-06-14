import mongoose from "mongoose";
import { createSlug } from "../utils";
const Schema = mongoose.Schema

export const AssetCategorySchema = new mongoose.Schema(
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
        extras: Schema.Types.Mixed,
        deletedAt: {
            type: Date,
            required: false,
            default: null,
        },
    },
    { timestamps: true }
);

// Middleware pre-save para generar el slug
AssetCategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = createSlug(this.name)
    }
    next();
});


export default mongoose.models.AssetCategory || mongoose.model("AssetCategory", AssetCategorySchema);

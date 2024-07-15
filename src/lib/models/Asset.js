import mongoose from "mongoose";
const Schema = mongoose.Schema


export const AssetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 255,
            required: [true, "Asset name is required"],
        },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        subCategory: { type: mongoose.Types.ObjectId, ref: 'SubCategory' },
        extras: Schema.Types.Mixed,
        deletedAt: {
            type: Date,
            required: false,
            default: null,
        },
    },
    { timestamps: true }
);

const Asset = mongoose.models.Asset || mongoose.model("Asset", AssetSchema);

export default Asset

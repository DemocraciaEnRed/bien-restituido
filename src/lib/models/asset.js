import mongoose from "mongoose";
const Schema = mongoose.Schema


export const AssetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 255,
            required: [true, "Asset name is required"],
        },
        type: { type: mongoose.Types.ObjectId, ref: 'AssetType' },
        extras: Schema.Types.Mixed,
        deletedAt: {
            type: Date,
            required: false,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Asset || mongoose.model("Asset", AssetSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema


export const AssetSchema = new mongoose.Schema(
    {
        ownerName: {
            type: String,
            max: 255,
        },
        ownerLastName: {
            type: String,
            max: 255,
        },
        ownerIdType: {
            type: String,
            max: 255,
        },
        ownerDni: {
            type: String,
            max: 255,
        },
        ownerAddress: {
            type: String,
            max: 255,
        },
        province: {
            type: String,
            max: 255
        },
        location: {
            type: String,
            max: 255
        },
        address: {
            type: String,
            max: 255
        },
        confiscated: {
            type: Boolean,
            default: false
        },
        destination: {
            type: String,
            max: 255
        },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        subCategory: { type: mongoose.Types.ObjectId, ref: 'SubCategory' },
        extras: Schema.Types.Mixed,
        cautelaDate: {
            type: Date,
        },
        cautelaResolution: {
            type: String
        },
        confiscatedDate: {
            type: Date,
        },
        confiscatedResolution: {
            type: String
        },
        Juzgado: {
            type: String
        },
        fiscalia: {
            type: String
        },
        tribunal: {
            type: String
        },
        causeNumber: {
            type: String
        },
        thirdParties: {
            type: Boolean
        },
        causeCoverSheet: { type: String },
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
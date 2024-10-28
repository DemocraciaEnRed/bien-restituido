import mongoose from "mongoose";
import { actorType } from "../utils/constants";
const Schema = mongoose.Schema

const thirdSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: actorType.map(type => type.value)
        },
        name: {
            type: String
        },
        lastName: {
            type: String
        },
        typeId: {
            type: String
        },
        numberId: {
            type: String
        }
    }
)

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
        ownerNumberId: {
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
        destinationInfo: Schema.Types.Mixed,
        destinationResolution: {
            type: String
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
        juzgadoJurisdiccion: {
            type: String
        },
        juzgado: {
            type: String
        },
        fiscaliaJurisdiccion: {
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
        third: {
            type: [thirdSchema],
            default: undefined
        },
        causeCoverSheet: { type: String },
        publish: {
            type: Boolean,
            default: false,
        },
        archivedAt: {
            type: Date,
            required: false,
            default: null,
        },
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
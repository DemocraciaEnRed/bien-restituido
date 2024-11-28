import mongoose from "mongoose";
import { actorType } from "../utils/constants";
const Schema = mongoose.Schema

const thirdSchema = new Schema(
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

const ownerSchema = new Schema(
    {
        Name: {
            type: String,
            max: 255,
        },
        LastName: {
            type: String,
            max: 255,
        },
        IdType: {
            type: String,
            max: 255,
        },
        NumberId: {
            type: String,
            max: 255,
        },
        Address: {
            type: String,
            max: 255,
        },
    }
)

export const AssetSchema = new Schema(
    {
        owner: {
            type: [ownerSchema]
        },
        country: {
            type: String,
            max: 255
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
        destinationComment: {
            type: String
        },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        subCategory: { type: mongoose.Types.ObjectId, ref: 'SubCategory' },
        assetImage: {
            type: String
        },
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
        prefixCauseNumber: {
            type: String,
            max: 4
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
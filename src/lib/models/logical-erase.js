import mongoose from "mongoose";
const Schema = mongoose.Schema


export const LogicalEraseSchema = new mongoose.Schema(
  {

    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },

);

export default mongoose.models.LogicalErase || mongoose.model("LogicalErase", LogicalEraseSchema);

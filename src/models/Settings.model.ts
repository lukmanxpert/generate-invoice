import mongoose from "mongoose";

interface ISignature {
  name: string;
  image: string;
}

export interface ISettings {
  _id?: mongoose.Types.ObjectId;
  invoiceLogo?: string;
  signature?: ISignature;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const signatureSchema = new mongoose.Schema<ISignature>(
  {
    name: { type: String, default: null },
    image: { type: String, default: null },
  },
  {
    _id: false,
  }
);

const settingsSchema = new mongoose.Schema<ISettings>(
  {
    invoiceLogo: { type: String, default: null },
    signature: signatureSchema,
    userId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
);

const settingsModel =
  mongoose.models.settings || mongoose.model("settings", settingsSchema);

export default settingsModel;

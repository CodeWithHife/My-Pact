import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPartner extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  relationship: string;
  phone: string;
  status: "connected" | "pending";
  lastDispatch: string;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    relationship: { type: String, default: "Study Partner" },
    phone: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["connected", "pending"],
      default: "connected",
    },
    lastDispatch: { type: String, default: "Standby" },
  },
  {
    timestamps: true,
  }
);

const Partner: Model<IPartner> = mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);

export default Partner;

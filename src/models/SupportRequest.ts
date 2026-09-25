import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISupportRequest extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: "payment" | "account" | "course" | "technical" | "general";
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  adminNotes?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SupportRequestSchema = new Schema<ISupportRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ["payment", "account", "course", "technical", "general"],
      default: "general",
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
      index: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    adminNotes: { type: String, default: "" },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

const SupportRequest: Model<ISupportRequest> =
  mongoose.models.SupportRequest ||
  mongoose.model<ISupportRequest>("SupportRequest", SupportRequestSchema);

export default SupportRequest;

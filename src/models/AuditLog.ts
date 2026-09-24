import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  userId: mongoose.Types.ObjectId;
  hash: string;
  timestamp: string;
  action: string;
  course: string;
  status: "verified" | "flagged" | "penalty" | "system";
  details: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    hash: { type: String, required: true },
    timestamp: { type: String, required: true },
    action: { type: String, required: true },
    course: { type: String, required: true },
    status: {
      type: String,
      enum: ["verified", "flagged", "penalty", "system"],
      default: "verified",
    },
    details: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

export default AuditLog;

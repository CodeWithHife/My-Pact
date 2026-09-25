import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  userId?: mongoose.Types.ObjectId | string;
  adminId?: mongoose.Types.ObjectId | string;
  adminEmail?: string;
  action: string;
  course?: string;
  target?: string;
  status?: string;
  hash?: string;
  timestamp?: string;
  details?: any;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: Schema.Types.Mixed },
    adminId: { type: Schema.Types.Mixed },
    adminEmail: { type: String },
    action: { type: String, required: true, index: true },
    course: { type: String, default: "General" },
    target: { type: String },
    status: { type: String, default: "verified" },
    hash: { type: String },
    timestamp: { type: String },
    details: { type: Schema.Types.Mixed },
    ipAddress: { type: String, default: "127.0.0.1" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

export default AuditLog;

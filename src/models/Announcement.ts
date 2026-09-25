import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "emergency";
  isPinned: boolean;
  isActive: boolean;
  targetRole: "all" | "student" | "admin";
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["info", "warning", "success", "emergency"],
      default: "info",
    },
    isPinned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    targetRole: { type: String, enum: ["all", "student", "admin"], default: "all" },
    createdBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

const Announcement: Model<IAnnouncement> =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export default Announcement;

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResource extends Document {
  courseCode: string;
  title: string;
  type: "note" | "past_question" | "formula_sheet" | "syllabus" | "other";
  fileUrl: string;
  fileSize?: string;
  isPublic: boolean;
  downloads: number;
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    courseCode: { type: String, required: true, uppercase: true, index: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["note", "past_question", "formula_sheet", "syllabus", "other"],
      default: "note",
    },
    fileUrl: { type: String, required: true },
    fileSize: { type: String, default: "1.2 MB" },
    isPublic: { type: Boolean, default: true },
    downloads: { type: Number, default: 0 },
    uploadedBy: { type: String, default: "Faculty" },
  },
  { timestamps: true }
);

const Resource: Model<IResource> =
  mongoose.models.Resource ||
  mongoose.model<IResource>("Resource", ResourceSchema);

export default Resource;

import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  course: string;
  category: "study" | "exam" | "homework" | "lab" | "project";
  time: string;
  date: string;
  days: string[];
  status: "active" | "pending" | "overdue" | "completed";
  duration: string;
  verificationMethod: "math" | "barcode" | "quiz" | "gps";
  isUrgent: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["study", "exam", "homework", "lab", "project"],
      default: "study",
    },
    time: { type: String, required: true },
    date: { type: String, required: true },
    days: { type: [String], default: ["Mon", "Wed", "Fri"] },
    status: {
      type: String,
      enum: ["active", "pending", "overdue", "completed"],
      default: "active",
    },
    duration: { type: String, default: "45 min" },
    verificationMethod: {
      type: String,
      enum: ["math", "barcode", "quiz", "gps"],
      default: "math",
    },
    isUrgent: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;

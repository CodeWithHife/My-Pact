import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  name: string;
  targetGrade: number;
  units?: number;
  currentGrade?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    targetGrade: { type: Number, default: 90, min: 0, max: 100 },
    units: { type: Number, default: 3 },
    currentGrade: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default Course;

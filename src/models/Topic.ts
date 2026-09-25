import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITopic extends Document {
  courseId?: mongoose.Types.ObjectId;
  courseCode: string;
  title: string;
  week: number;
  description: string;
  order: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    courseCode: { type: String, required: true, uppercase: true, index: true },
    title: { type: String, required: true },
    week: { type: Number, default: 1 },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Topic: Model<ITopic> =
  mongoose.models.Topic || mongoose.model<ITopic>("Topic", TopicSchema);

export default Topic;

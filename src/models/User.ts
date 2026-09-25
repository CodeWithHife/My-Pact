import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  phone?: string;
  university?: string;
  faculty?: string;
  level?: string;
  targetGpa?: string;
  tier?: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  subscription?: {
    planId: string;
    planName: string;
    planType: "free" | "paid";
    status: "active" | "expired" | "pending";
    freeTrialStartedAt?: Date;
    freeTrialExpiresAt?: Date;
    paidAt?: Date;
    expiresAt?: Date;
    amountPaid?: number;
    reference?: string;
    studyTasksUsed?: number;
    maxStudyTasks?: number;
    maxCourses?: number;
  };
  isOnboarded: boolean;
  avatarColor?: string;
  streakDays: number;
  focusMinutesTotal: number;
  focusSessionsCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    university: { type: String, default: "Institution not set" },
    faculty: { type: String, default: "Field of study not set" },
    level: { type: String, default: "Undergraduate" },
    targetGpa: { type: String, default: "First Class (4.50 - 5.00)" },
    tier: { type: String, default: "STRICT ENFORCEMENT" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
    subscription: {
      planId: { type: String, default: "free-trial" },
      planName: { type: String, default: "Free Trial" },
      planType: { type: String, enum: ["free", "paid"], default: "free" },
      status: { type: String, enum: ["active", "expired", "pending"], default: "active" },
      freeTrialStartedAt: { type: Date },
      freeTrialExpiresAt: { type: Date },
      paidAt: { type: Date },
      expiresAt: { type: Date },
      amountPaid: { type: Number, default: 0 },
      reference: { type: String },
      studyTasksUsed: { type: Number, default: 0 },
      maxStudyTasks: { type: Number, default: 10 },
      maxCourses: { type: Number, default: 3 },
    },
    isOnboarded: { type: Boolean, default: false },
    avatarColor: { type: String, default: "bg-[#0a66ff]" },
    streakDays: { type: Number, default: 1 },
    focusMinutesTotal: { type: Number, default: 0 },
    focusSessionsCompleted: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

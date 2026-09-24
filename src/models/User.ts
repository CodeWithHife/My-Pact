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

// Prevent mongoose model overwrite error during hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

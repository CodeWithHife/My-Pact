import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPlan extends Document {
  name: string;
  slug: string;
  price: number;
  period: string;
  durationDays: number;
  badge?: string;
  popular?: boolean;
  description: string;
  icon: string;
  iconColor: string;
  buttonText: string;
  features: string[];
  limits: {
    maxCourses: number;
    maxDailyTasks: number;
    aiPromptsPerDay: number;
    lockoutLevel: number;
  };
  type: "free" | "paid" | "custom";
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true, default: 0 },
    period: { type: String, required: true, default: "per month" },
    durationDays: { type: Number, required: true, default: 30 },
    badge: { type: String },
    popular: { type: Boolean, default: false },
    description: { type: String, default: "" },
    icon: { type: String, default: "fas fa-shield-alt" },
    iconColor: { type: String, default: "text-[#0a66ff] bg-[#e8f0fe]" },
    buttonText: { type: String, default: "Choose Plan" },
    features: [{ type: String }],
    limits: {
      maxCourses: { type: Number, default: 3 },
      maxDailyTasks: { type: Number, default: 10 },
      aiPromptsPerDay: { type: Number, default: 10 },
      lockoutLevel: { type: Number, default: 1 },
    },
    type: { type: String, enum: ["free", "paid", "custom"], default: "paid" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Plan: Model<IPlan> =
  mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);

export default Plan;

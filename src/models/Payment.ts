import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  userId?: mongoose.Types.ObjectId;
  userEmail: string;
  userName: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  senderName: string;
  senderBank: string;
  transactionRef?: string;
  reference: string;
  paymentProof?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userEmail: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "NGN" },
    senderName: { type: String, required: true },
    senderBank: { type: String, default: "OPay" },
    transactionRef: { type: String },
    reference: { type: String, required: true, unique: true, index: true },
    paymentProof: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    rejectionReason: { type: String },
    reviewedBy: { type: String },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;

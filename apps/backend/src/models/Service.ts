import mongoose, { Schema } from "mongoose";
import { Service, ServiceBooking } from "@mobile-shop/core";

const ServiceSchema = new Schema<Service>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    estimatedDuration: { type: Number, required: true },
    category: {
      type: String,
      enum: ["repair", "maintenance", "consultation"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ServiceModel = mongoose.model<Service>("Service", ServiceSchema);

const BookingSchema = new Schema<ServiceBooking>(
  {
    serviceId: { type: String, required: true, ref: "Service" },
    userId: { type: String, required: true, ref: "User" },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    deviceModel: { type: String, required: true },
    issueDescription: { type: String },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model<ServiceBooking>("Booking", BookingSchema);

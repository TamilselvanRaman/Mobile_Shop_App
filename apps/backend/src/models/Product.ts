import mongoose, { Schema } from "mongoose";
import { Product } from "@mobile-shop/core";

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, enum: ["mobile", "accessory"], required: true },
    stock: { type: Number, default: 0 },
    specs: { type: Map, of: String },
    isRefurbished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<Product>("Product", ProductSchema);

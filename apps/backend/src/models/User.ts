import mongoose, { Schema } from "mongoose";
import { User, UserRole } from "@mobile-shop/core";

// Extend the shared User interface to include the password field for the database model
interface IUserModel extends Omit<User, 'id'> {
  password: string;
}

const UserSchema = new Schema<IUserModel>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "technician", "customer"],
      default: "customer",
    },
    phone: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
  },
  { timestamps: true }
);

// Add a toJSON transform to map _id to id
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Don't return password
    return ret;
  }
});

export const UserModel = mongoose.model<IUserModel>("User", UserSchema);

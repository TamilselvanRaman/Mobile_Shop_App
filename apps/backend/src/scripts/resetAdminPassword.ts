import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserModel } from "../models/User";

dotenv.config();

const CONNECTION_URL = process.env.MONGO_URI || "mongodb://localhost:27017/mobile_shop";

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log('Connected to MongoDB');

    const adminEmail = "admin@mobileshop.com";
    const newPassword = "admin123";
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Find and update the user
    // We use findOneAndUpdate to atomically update the document
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: adminEmail },
      { 
        $set: { 
          password: hashedPassword,
          name: "Admin User", // Ensure name is set
          role: "admin"       // Ensure role is admin
        }
      },
      { new: true, upsert: true } // Create if doesn't exist (upsert)
    );

    console.log("Admin password has been reset successfully.");
    console.log("Email:", adminEmail);
    console.log("New Password:", newPassword);
    console.log("User Role:", updatedUser.role);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error resetting password:", error);
    process.exit(1);
  }
};

resetAdminPassword();

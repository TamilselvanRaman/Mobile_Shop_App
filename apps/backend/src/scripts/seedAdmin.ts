import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserModel } from "../models/User";

dotenv.config();

const CONNECTION_URL = process.env.MONGO_URI || "mongodb://localhost:27017/mobile_shop";

const seedAdmin = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log('Connected to MongoDB');

    const adminEmail = "admin@mobileshop.com";
    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      console.log("Email:", adminEmail);
      // We won't print the password here as we can't retrieve it in plain text
      console.log("If you forgot the password, you may need to reset it manually or delete the user.");
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 12);
      await UserModel.create({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        phone: "1234567890",
        address: {
          street: "Admin St",
          city: "Admin City",
          state: "Admin State",
          zip: "00000"
        }
      });
      console.log("Admin user created successfully!");
      console.log("Email:", adminEmail);
      console.log("Password: admin123");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();

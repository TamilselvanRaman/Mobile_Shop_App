"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
dotenv_1.default.config();
const CONNECTION_URL = process.env.MONGO_URI || "mongodb://localhost:27017/mobile_shop";
const resetAdminPassword = async () => {
    try {
        await mongoose_1.default.connect(CONNECTION_URL);
        console.log('Connected to MongoDB');
        const adminEmail = "admin@mobileshop.com";
        const newPassword = "admin123";
        // Hash the new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
        // Find and update the user
        // We use findOneAndUpdate to atomically update the document
        const updatedUser = await User_1.UserModel.findOneAndUpdate({ email: adminEmail }, {
            $set: {
                password: hashedPassword,
                name: "Admin User", // Ensure name is set
                role: "admin" // Ensure role is admin
            }
        }, { new: true, upsert: true } // Create if doesn't exist (upsert)
        );
        console.log("Admin password has been reset successfully.");
        console.log("Email:", adminEmail);
        console.log("New Password:", newPassword);
        console.log("User Role:", updatedUser.role);
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error("Error resetting password:", error);
        process.exit(1);
    }
};
resetAdminPassword();

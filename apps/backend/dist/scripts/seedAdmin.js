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
const seedAdmin = async () => {
    try {
        await mongoose_1.default.connect(CONNECTION_URL);
        console.log('Connected to MongoDB');
        const adminEmail = "admin@mobileshop.com";
        const existingAdmin = await User_1.UserModel.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin user already exists.");
            console.log("Email:", adminEmail);
            // We won't print the password here as we can't retrieve it in plain text
            console.log("If you forgot the password, you may need to reset it manually or delete the user.");
        }
        else {
            const hashedPassword = await bcryptjs_1.default.hash("admin123", 12);
            await User_1.UserModel.create({
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
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};
seedAdmin();

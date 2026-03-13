"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "test"; // In production, use process.env.JWT_SECRET
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decodedData = jsonwebtoken_1.default.verify(token, secret);
            req.userId = decodedData?.id;
        }
        else {
            return res.status(401).json({ message: "Unauthenticated" });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthenticated" });
    }
};
exports.default = auth;

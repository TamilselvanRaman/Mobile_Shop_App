"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "30mb" }));
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ status: 'ok', database: dbStatus });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/services", serviceRoutes_1.default);
const CONNECTION_URL = process.env.MONGO_URI || "mongodb://localhost:27017/mobile_shop";
const PORT = process.env.PORT || 5001;
mongoose_1.default
    .connect(CONNECTION_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`MongoDB connection error: ${error.message}`));
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

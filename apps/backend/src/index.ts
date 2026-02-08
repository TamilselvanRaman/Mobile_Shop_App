import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import serviceRoutes from "./routes/serviceRoutes";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', database: dbStatus });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);

const CONNECTION_URL = process.env.MONGO_URI || "mongodb://localhost:27017/mobile_shop";
const PORT = process.env.PORT || 5001;

mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(`MongoDB connection error: ${error.message}`));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

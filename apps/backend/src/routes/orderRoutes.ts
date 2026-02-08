import express from "express";
import { getOrders, createOrder, updateOrderStatus, getUserOrders } from "../controllers/OrderController";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", getOrders);
router.get("/myorders", auth, getUserOrders);
router.post("/", auth, createOrder); // Secured creation
router.patch("/:id/status", auth, updateOrderStatus); // Secured update

export default router;

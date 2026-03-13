"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = exports.updateOrderStatus = exports.createOrder = exports.getOrders = void 0;
const Order_1 = require("../models/Order");
const getOrders = async (req, res) => {
    try {
        const orders = await Order_1.OrderModel.find().sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
exports.getOrders = getOrders;
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order_1.OrderModel(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};
exports.createOrder = createOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await Order_1.OrderModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedOrder)
            return res.status(404).json({ message: "Order not found" });
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const getUserOrders = async (req, res) => {
    try {
        if (!req.userId)
            return res.status(401).json({ message: "Unauthenticated" });
        const orders = await Order_1.OrderModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user orders", error });
    }
};
exports.getUserOrders = getUserOrders;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatus = exports.getBookings = exports.createService = exports.getServices = void 0;
const Service_1 = require("../models/Service");
// --- Services ---
const getServices = async (req, res) => {
    try {
        const services = await Service_1.ServiceModel.find();
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching services", error });
    }
};
exports.getServices = getServices;
const createService = async (req, res) => {
    try {
        const newService = new Service_1.ServiceModel(req.body);
        const savedService = await newService.save();
        res.status(201).json(savedService);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating service", error });
    }
};
exports.createService = createService;
// --- Bookings ---
const getBookings = async (req, res) => {
    try {
        const bookings = await Service_1.BookingModel.find()
            .populate("serviceId", "name")
            .sort({ date: -1 });
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
};
exports.getBookings = getBookings;
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedBooking = await Service_1.BookingModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking)
            return res.status(404).json({ message: "Booking not found" });
        res.json(updatedBooking);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating booking", error });
    }
};
exports.updateBookingStatus = updateBookingStatus;

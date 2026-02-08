import express from "express";
import { 
  getServices, 
  createService, 
  getBookings, 
  updateBookingStatus 
} from "../controllers/ServiceController";

const router = express.Router();

// Service Management
router.get("/", getServices);
router.post("/", createService);

// Booking Management
router.get("/bookings", getBookings);
router.patch("/bookings/:id/status", updateBookingStatus);

export default router;

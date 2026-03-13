"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ServiceController_1 = require("../controllers/ServiceController");
const router = express_1.default.Router();
// Service Management
router.get("/", ServiceController_1.getServices);
router.post("/", ServiceController_1.createService);
// Booking Management
router.get("/bookings", ServiceController_1.getBookings);
router.patch("/bookings/:id/status", ServiceController_1.updateBookingStatus);
exports.default = router;

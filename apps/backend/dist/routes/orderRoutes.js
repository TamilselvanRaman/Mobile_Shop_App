"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/", OrderController_1.getOrders);
router.get("/myorders", auth_1.default, OrderController_1.getUserOrders);
router.post("/", auth_1.default, OrderController_1.createOrder); // Secured creation
router.patch("/:id/status", auth_1.default, OrderController_1.updateOrderStatus); // Secured update
exports.default = router;

import express from "express";
import {
    createOrder,
    getOrders,
    getUserOrders,
    getOrderStatus,
    updateOrder,
    deleteOrder,
    updateOrderStatus
} from "../controllers/orderController.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/status/:id", getOrderStatus);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

router.get("/", isAdmin, getOrders);
router.patch("/:id/status", isAdmin, updateOrderStatus);

export default router;
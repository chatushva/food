import express from "express";
import { placeOrder, verifyOrder,userOrders, listOrders,updateOrderStatus } from "../controller/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Place order (protected)
router.post("/place", authMiddleware, placeOrder);

// Verify order (frontend calls after payment)
router.post("/verify",  verifyOrder);
router.post("/userorders",authMiddleware,userOrders);
router.get("/list",listOrders)
router.post("/status",updateOrderStatus);



export default router;

const express = require("express");
const router = express.Router();
const {
    createOrderController,
    getOrdersByUserController,
    getOrderDetailsController,
    updateOrderStatusController,
    getAllOrdersController
} = require("../controllers/orderController");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/checkToken");

// Create a new order
router.post("/", verifyToken, createOrderController);

// Get orders by user
router.get("/user/:userNo", verifyToken, getOrdersByUserController);

// Get order details
router.get("/:orderNo", verifyToken, getOrderDetailsController);

// Update order status
router.put("/:orderNo/status", verifyToken, updateOrderStatusController);


// Get all order
router.get("/orders",verifyTokenAndAdmin,getAllOrdersController);

module.exports = router; 
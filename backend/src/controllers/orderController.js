const asyncHandler = require("express-async-handler");
const orderModel = require("../model/order");

const createOrderController = asyncHandler(async (req, res) => {
    try {
        const orderNo = await orderModel.createOrder(req.body);
        return res.status(201).json({
            success: true,
            data: { orderNo }
        });
    } catch (error) {
        console.log("Error in createOrderController: ", error);
        return res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message
        });
    }
});

const getOrdersByUserController = asyncHandler(async (req, res) => {
    try {
        const { userNo } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const result = await orderModel.getOrdersByUser(
            parseInt(userNo),
            parseInt(page),
            parseInt(limit)
        );
        
        return res.status(200).json({
            success: true,
            data: {
                orders: result.orders,
                pagination: {
                    total: result.totalCount,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(result.totalCount / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.log("Error in getOrdersByUserController: ", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user orders",
            error: error.message
        });
    }
});

const getOrderDetailsController = asyncHandler(async (req, res) => {
    try {
        const { orderNo } = req.params;
        const details = await orderModel.getOrderDetails(parseInt(orderNo));
        
        return res.status(200).json({
            success: true,
            data: details
        });
    } catch (error) {
        console.log("Error in getOrderDetailsController: ", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching order details",
            error: error.message
        });
    }
});

const updateOrderStatusController = asyncHandler(async (req, res) => {
    try {
        const { orderNo } = req.params;
        const { status } = req.body;
        
        const updated = await orderModel.updateOrderStatus(
            parseInt(orderNo),
            status
        );
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully"
        });
    } catch (error) {
        console.log("Error in updateOrderStatusController: ", error);
        return res.status(500).json({
            success: false,
            message: "Error updating order status",
            error: error.message
        });
    }
});

const getAllOrdersController = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        
        const result = await orderModel.getAllOrders(
            parseInt(page),
            parseInt(limit),
            status
        );
        
        return res.status(200).json({
            success: true,
            data: {
                orders: result.orders,
                pagination: {
                    total: result.totalCount,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(result.totalCount / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.log("Error in getAllOrdersController: ", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
});

module.exports = {
    createOrderController,
    getOrdersByUserController,
    getOrderDetailsController,
    updateOrderStatusController,
    getAllOrdersController
}; 
import Order from "../models/orderModel.js";


export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);

        const saved = await order.save();

        res.status(201).json(saved);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.params.userId
        });

        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json(updated);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json(updated);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const getOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            orderId: order._id,
            status: order.status
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
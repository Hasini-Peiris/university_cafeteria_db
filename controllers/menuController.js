import Menu from "../models/menuModel.js";

export const createMenu = async (req, res) => {
    try {
        const menu = new Menu(req.body);
        const saved = await menu.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getMenuByCategory = async (req, res) => {
    try {
        const menu = await Menu.find({ category: req.params.category });

        if (menu.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No menu items found in this category"
            });
        }

        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateMenu = async (req, res) => {
    try {
        const updated = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const deleted = await Menu.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Menu deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
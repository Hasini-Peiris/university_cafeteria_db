import express from "express";
import {
    createMenu,
    getMenu,
    getMenuByCategory,
    updateMenu,
    deleteMenu
} from "../controllers/menuController.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getMenu);
router.get("/category/:category", getMenuByCategory);

router.post("/", isAdmin, createMenu);
router.put("/:id", isAdmin, updateMenu);
router.delete("/:id", isAdmin, deleteMenu);

export default router;
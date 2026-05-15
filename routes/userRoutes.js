import express from "express";
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", isAdmin, getUsers);
router.put("/:id", updateUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;
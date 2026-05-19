import express from "express";
import { adminLogin, login, me, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/register", requireFields(["name", "email", "password"]), register);
router.post("/login", requireFields(["email", "password"]), login);
router.post("/admin/login", requireFields(["email", "password"]), adminLogin);
router.get("/me", protect, me);

export default router;

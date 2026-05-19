import express from "express";
import { acknowledgeAlert, getAlerts } from "../controllers/alertController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAlerts);
router.patch("/:id/acknowledge", protect, acknowledgeAlert);

export default router;

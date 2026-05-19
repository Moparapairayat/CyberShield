import express from "express";
import { downloadThreatReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/threat-report", protect, downloadThreatReport);

export default router;

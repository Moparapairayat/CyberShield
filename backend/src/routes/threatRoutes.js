import express from "express";
import {
  getThreatAnalytics,
  getThreatLogs,
  simulateBruteForce,
  simulateUnknownAccount,
  simulateSuspiciousRequests
} from "../controllers/threatController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/logs", protect, getThreatLogs);
router.get("/analytics", protect, getThreatAnalytics);
router.post("/simulate/bruteforce", protect, requireAdmin, simulateBruteForce);
router.post("/simulate/unknown-account", protect, requireAdmin, simulateUnknownAccount);
router.post("/simulate/suspicious-requests", protect, requireAdmin, simulateSuspiciousRequests);

export default router;

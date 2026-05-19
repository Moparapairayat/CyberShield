import AlertModel from "../models/AlertModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAlerts = asyncHandler(async (req, res) => {
  const { level = "", acknowledged = "", page = 1, limit = 20 } = req.query;
  const query = {};

  if (level) query.level = level;
  if (acknowledged !== "") query.acknowledged = acknowledged === "true";

  const skip = (Number(page) - 1) * Number(limit);
  const [alerts, total] = await Promise.all([
    AlertModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
    AlertModel.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      alerts,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1
    }
  });
});

export const acknowledgeAlert = asyncHandler(async (req, res) => {
  const alert = await AlertModel.findByIdAndUpdate(
    req.params.id,
    { acknowledged: true },
    { new: true }
  );

  res.json({
    success: true,
    data: alert
  });
});

import PDFDocument from "pdfkit";
import AlertModel from "../models/AlertModel.js";
import LoginAttemptModel from "../models/LoginAttemptModel.js";
import ThreatLogModel from "../models/ThreatLogModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const downloadThreatReport = asyncHandler(async (req, res) => {
  const [attempts, failed, alerts, threats, latestThreats] = await Promise.all([
    LoginAttemptModel.countDocuments(),
    LoginAttemptModel.countDocuments({ success: false }),
    AlertModel.countDocuments(),
    ThreatLogModel.countDocuments(),
    ThreatLogModel.find().sort({ createdAt: -1 }).limit(10).lean()
  ]);

  const doc = new PDFDocument({ margin: 48 });
  const filename = `CyberShield-Threat-Report-${Date.now()}.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  doc.pipe(res);
  doc.fontSize(22).text("CyberShield Threat Intelligence Report", { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(10).fillColor("#555").text(`Generated: ${new Date().toLocaleString()}`, {
    align: "center"
  });
  doc.moveDown();

  doc.fillColor("#111").fontSize(14).text("Executive Summary");
  doc.moveDown(0.5);
  doc.fontSize(11).text(`Total login attempts: ${attempts}`);
  doc.text(`Failed login attempts: ${failed}`);
  doc.text(`Threat logs: ${threats}`);
  doc.text(`Alerts generated: ${alerts}`);
  doc.moveDown();

  doc.fontSize(14).text("Recent Threat Events");
  doc.moveDown(0.5);

  latestThreats.forEach((threat, index) => {
    doc
      .fontSize(10)
      .fillColor("#111")
      .text(`${index + 1}. [${threat.level}] ${threat.event}`, { continued: false });
    doc.fillColor("#555").text(`   ${threat.description}`);
    doc.text(`   IP: ${threat.ipAddress || "N/A"} | Email: ${threat.email || "N/A"}`);
    doc.moveDown(0.25);
  });

  doc.moveDown();
  doc.fillColor("#111").fontSize(12).text("Recommended Actions");
  doc.fontSize(10).list([
    "Enable account lockout policies for repeated failed authentication.",
    "Monitor high-risk IP addresses and throttle rapid login requests.",
    "Require MFA for administrator accounts.",
    "Review alert history after each simulated attack demo."
  ]);

  doc.end();
});

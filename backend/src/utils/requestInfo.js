export function getRequestInfo(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ipAddress = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0]?.trim() || req.ip || req.socket.remoteAddress || "unknown";

  return {
    ipAddress,
    userAgent: req.headers["user-agent"] || "Unknown client",
    endpoint: `${req.method} ${req.originalUrl}`
  };
}

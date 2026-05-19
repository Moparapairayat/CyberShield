import { asyncHandler } from "../utils/asyncHandler.js";
import { getRequestInfo } from "../utils/requestInfo.js";
import { authService } from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, department } = req.body;
  const result = await authService.register({ name, email, password, department });

  res.status(201).json({
    success: true,
    message: "Registration successful.",
    data: result
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({
    email,
    password,
    requestInfo: getRequestInfo(req)
  });

  res.json({
    success: true,
    message: "Login successful.",
    data: result
  });
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({
    email,
    password,
    expectedRole: "admin",
    requestInfo: getRequestInfo(req)
  });

  res.json({
    success: true,
    message: "Admin login successful.",
    data: result
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user
    }
  });
});

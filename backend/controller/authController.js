import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Access token (short-lived)
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m", // can increase to "7d" if you want
  });

  // Refresh token (long-lived)
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  res.json({ accessToken, refreshToken });
};

// Refresh token controller
export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
      expiresIn: "15m", // or "7d" for longer
    });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

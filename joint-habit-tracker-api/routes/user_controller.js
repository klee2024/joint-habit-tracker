import express from "express";

const router = express.Router();

import User from "../model/User.js";

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

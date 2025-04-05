import express from "express";
import mongoose from "mongoose";

const router = express.Router();

import Habit from "../model/Habit.js";

import { mongo, Types } from "mongoose";
const ObjectId = Types.ObjectId;

// get all habits
router.get("/", async (req, res, next) => {
  try {
    const habits = await Habit.find({})
      .populate("user1")
      .populate("user2")
      .populate("habitDays");
    if (!habits) {
      return res.status(404).json({ message: "User does not have any habits" });
    }
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all habits for a user
router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    // check if the ID is valid
    const mongooseUserId = new ObjectId(userId);
    if (!ObjectId.isValid(mongooseUserId)) {
      res.status(400).next({ message: "User ID is not valid" });
    }
    console.log("mongoose user id", new mongoose.Types.ObjectId(userId));
    // find all the habits
    // where user1 or user2 is equal to the userId
    const habits = await Habit.find({
      $or: [
        { user1: new mongoose.Types.ObjectId(userId) },
        { user2: new mongoose.Types.ObjectId(userId) },
      ],
    })
      .populate("user1")
      .populate("user2")
      .populate("habitDays");
    if (!habits) {
      return res.status(404).json({ message: "User does not have any habits" });
    }
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

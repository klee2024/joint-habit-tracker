import express from "express";
import mongoose from "mongoose";

const router = express.Router();

import Habit from "../model/Habit.js";

import { mongo, Types } from "mongoose";
const ObjectId = Types.ObjectId;

// CREATE
// creating a habit
router.post("/", async (req, res, next) => {
  try {
    const newHabitBody = req.body;
    // TODO: add validation and error handling
    const newHabit = await Habit.create(habitData);
    if (!newHabit) {
      const error = new Error("Could not create habit");
      error.status = 400;
      return next(error);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ
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
router.get("user/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // check if the ID is valid
    if (!isValidMongooseId(userId)) {
      return res.status(400).json({ message: "User ID is not valid" });
    }

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
      .populate("habitDays"); // TODO: MAY BE ABLE TO REMOVE THIS
    if (!habits) {
      return res.status(404).json({ message: "User does not have any habits" });
    }
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a habit by ID
router.get("/:habitId", async (req, res, next) => {
  try {
    const habitId = req.params.habitId;
    if (!isValidMongooseId(habitId)) {
      return res.status(400).json({ message: "Habit ID is not valid" });
    }

    // find all the habits
    // where user1 or user2 is equal to the userId
    const habit = await Habit.findById(habitId)
      .populate("user1")
      .populate("user2")
      .populate("habitDays"); // TODO: MAY BE ABLE TO REMOVE THIS
    if (!habit) {
      return res.status(404).json({ message: "This habit does not exist" });
    }
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TODO: add UPDATE route

// DELETE
// deleting a habit
router.delete("/:habitId", async (req, res, next) => {
  try {
    const habitId = req.params.habitId;
    // see if the habitId is valid
    if (!isValidMongooseId(habitId)) {
      return res.status(400).json({ message: "Habit ID is not valid" });
    }
    const deletedHabit = await Habit.findByIdAndDelete(habitId);
    if (!deletedHabit) {
      res.status(400).json("no habit to delete");
    }
    res.status(200).json(deletedHabit);
  } catch (err) {
    res.status(500).next({ message: err.message });
  }
});

function isValidMongooseId(id) {
  console.log(id);
  if (id.length != 24 || !isNaN(Number(id))) {
    return false;
  }
  const mongooseId = new ObjectId(id);
  return ObjectId.isValid(mongooseId);
}

export default router;

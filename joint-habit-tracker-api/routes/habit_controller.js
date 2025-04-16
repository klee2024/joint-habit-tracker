import express from "express";
import mongoose from "mongoose";
import isValidMongooseId from "../utils.js";

const router = express.Router();

import Habit from "../model/Habit.js";

import { mongo, Types } from "mongoose";
const ObjectId = Types.ObjectId;

// -------------- MIDDLEWARE / VALIDATORS -------------

const validateHabit = (req, res, next) => {
  const habit = req.body;

  // there are 3 required fields
  const requiredFields = ["title", "strict", "user1"];
  const missingFields = requiredFields.filter(
    (field) => !habit.hasOwnProperty(field)
  );
  const optionalFields = ["user2", "dateEnd"];

  if (
    missingFields.length > 0 ||
    habit.length < 3 ||
    habit.length > requiredFields.length + optionalFields.length
  ) {
    return res.status(400).json({
      message: "Error: Missing or invalid properties. Cannot create new habit",
    });
  }

  // TODO: check that the types are correct

  next(); // Proceed to the next middleware or route handler
};

// TODO: standardize error handling
// TODO: add middleware for validation

// TODO: finish POST route
// CREATE
// creating a habit
router.post("/", validateHabit, async (req, res, next) => {
  try {
    const newHabitBody = req.body;
    // TODO: add validation and error handling
    const newHabit = await Habit.create(newHabitBody);
    if (!newHabit) {
      const error = new Error("Could not create habit");
      error.status = 400;
      return next(error);
    }
    res.status(201).json(newHabit);
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
router.get("/user/:userId", async (req, res, next) => {
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

// updating habit settings
router.put("/:habitId", async (req, res, next) => {
  try {
    const habitId = req.params.habitId;
    // TODO: add validation to the habit body
    const newHabit = req.body;
    if (!isValidMongooseId(habitId)) {
      res.status(400).json({ message: "Habit id is not valid" });
    }
    // TODO: confirm that this is the correct format for method call
    const updatedHabit = findByIdAndUpdate(habitId, newHabit, {
      new: true,
      runValidators: true,
    });
    if (!updatedHabit) {
      res.status(400).json(`habit ${habitId} does not exist`);
    }
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// adding the second user to the habit when they accept
router.put("/:habitId/user2/:userId", async (req, res, next) => {
  try {
    const habitId = req.params.habitId;
    const userId = req.params.userId;
    if (!isValidMongooseId(habitId)) {
      return res.status(400).json({ message: "Habit ID is not valid" });
    }
    if (!isValidMongooseId(userId)) {
      return res.status(400).json({ message: "User ID is not valid" });
    }
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      { user2: userId },
      { new: true, runValidators: true }
    );
    if (!updatedHabit) {
      res
        .status(400)
        .json({ message: `habit ${habitId} habit does not exist` });
    }
    // TODO: confirm PUT status code
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
// deleting a habit
// only delete habit if both users want to delete
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

export default router;

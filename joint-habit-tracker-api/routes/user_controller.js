import express from "express";

const router = express.Router();

import User from "../model/User.js";

// TODO: standardize error handling
// TODO: add middleware for validation

// CREATE
// creating a user
router.post("/", async (req, res, next) => {
  // TODO: add user validation middleware
  try {
    const newUserBody = req.body;
    const newUser = await User.create(newUserBody);
    if (!newUser) {
      res.status(400).json({ message: "could not create new user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all users
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

// GET a specific user by Id
router.get("/:userId", async (req, res, next) => {
  // TODO: add in middleware for userId validation
  try {
    const userId = req.params.userId;
    if (!isValidMongooseId(userId)) {
      res.status(400).json({ message: "user id is not valid" });
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json(`user ${userId} does not exist`);
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific user by username and password (MVP w/o auth)
router.get("/username/:username/password/:password", async (req, res, next) => {
  try {
    const username = req.params.username;
    const password = req.params.password;
    const user = await User.find({ username: username, password: password });
    if (!user) {
      res.status(400).json(`username or password is not correct`);
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
// updating a user's profile
router.put("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!isValidMongooseId(userId)) {
      res.status(400).json({ message: "user id is not valid" });
    }
    const updatedUserBody = req.body;
    // TODO: add in validation
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserBody, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(400).json({ message: `could not update user ${userId}` });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TOOD: updating a user's password (see if it makes sense to make this a diff route)

// DELETE
// deleting a user
router.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!isValidMongooseId(userId)) {
      res.status(400).json({ message: "user id is not valid" });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(400).json({ message: `could not delete user ${userId}` });
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

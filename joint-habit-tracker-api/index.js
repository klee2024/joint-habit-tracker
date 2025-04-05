import mongoose from "mongoose";
import User from "./model/User.js";
import Habit from "./model/Habit.js";
import express from "express";
import dotenv from "dotenv";

// get environment variable from .env
dotenv.config();

const app = express();
const port = 3000;

const uri = process.env.MONGO_URI;

// Event listeners for connection success or failure
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB!");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

async function startApp() {
  try {
    await mongoose.connect(uri);

    // create a new user
    const user1 = new User({
      username: "first user!",
      email: "first@gmail.com",
      password: "password",
    });

    await user1.save();
    const firstUser = await User.findOne({});
    console.log(firstUser);

    // create a new habit
    const habit1 = new Habit({
      title: "first habit",
      strict: false,
      user1: user1._id,
      dateEnd: new Date("2022-01-01"),
      dateStart: new Date("2021-01-01"),
      streakCounter: 0,
      habitDays: [],
    });

    await habit1.save();
    const firstHabit = await Habit.findOne({});
    console.log(firstHabit);

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
startApp();

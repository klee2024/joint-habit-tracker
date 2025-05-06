import mongoose from "mongoose";
import User from "./model/User.js";
import Habit from "./model/Habit.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import controllers
import userController from "./routes/user_controller.js";
import habitController from "./routes/habit_controller.js";

// get environment variable from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB
const uri = process.env.MONGO_URI;

mongoose.connect(uri);

// Event listeners for connection success or failure
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB!");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// set up routes
app.use("/habits", habitController);
app.use("/users", userController);

app.get("/", (req, res) => {
  res.send("Habit API!");
});

app.use((req, res) => {
  res.status(404).send("Route not Found");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

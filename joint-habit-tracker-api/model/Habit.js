import mongoose from "mongoose";
const { Schema, model } = mongoose;

const habitSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  strict: {
    type: Boolean,
    required: true,
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // create a user schema
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  dateEnd: {
    type: Date,
    required: false,
  },
  dateStart: {
    type: Date,
    default: Date.now, // Set default to current date and time
  },
  // handled on the backend
  streakCounter: {
    type: Number,
    default: 0,
  },
  // handled on the backend
  totalDaysHabitCompleted: {
    type: Number,
    default: 0,
  },
  //handled on the backend
  habitToday: {
    user1Complete: Boolean,
    user2Complete: Boolean,
    date: Date,
  },
  habitDays: [
    {
      user1Complete: Boolean,
      user2Complete: Boolean,
      date: Date,
    },
  ],
});

const Habit = model("Habit", habitSchema);
export default Habit;

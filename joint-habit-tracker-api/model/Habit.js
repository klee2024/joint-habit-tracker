import mongoose from "mongoose";
const { Schema, model } = mongoose;

const habitSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  strict: Boolean,
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
  dateEnd: Date,
  dateStart: Date,
  streakCounter: {
    type: Number,
    default: 0,
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

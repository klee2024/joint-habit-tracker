import type { HabitDay } from './habitDay.type';
import type { User } from './user.type';
export type Habit = {
  title: string;
  strict: boolean;
  user1: User; // create a user schema
  user2: User;
  dateEnd: Date;
  dateStart: Date;
  streakCounter: number;
  totalDaysHabitCompleted: number;
  habitDays: HabitDay;
};

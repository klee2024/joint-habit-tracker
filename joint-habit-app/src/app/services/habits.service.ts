import { Injectable, inject } from '@angular/core';
import { HabitDay } from '../model/habitDay.type';
import { HttpClient } from '@angular/common/http';
import { Habit } from '../model/habit.type';
@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  http = inject(HttpClient);

  constructor() {}

  getHabit(habitId: string) {
    const url = `http://localhost:3000/habits/${habitId}`;
    return this.http.get<Habit>(url);
  }

  getUserHabits(userId: string) {
    const url = `http://localhost:3000/habits/user/${userId}`;
    const userHabits = this.http.get<Array<Habit>>(url);
    return userHabits;
  }

  updateHabitTodayById(
    userId: string,
    body: { user1Complete: boolean } | { user2Complete: boolean }
  ) {
    const url = `http://localhost:3000/habits/${userId}/habit-today`;
    return this.http.patch(url, body);
  }

  updateHabitDays(habitId: string) {
    const url = `http://localhost:3000/habits/${habitId}/habit-days`;
    const updatedHabit = this.http.patch<Habit>(url, {});
    return updatedHabit;
  }
}

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
}

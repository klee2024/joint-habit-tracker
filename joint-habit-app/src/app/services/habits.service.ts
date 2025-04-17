import { Injectable, inject } from '@angular/core';
import { HabitDay } from '../model/habitDay.type';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  http = inject(HttpClient);
  habitDays: HabitDay[] = [
    {
      id: 'asfasfsf',
      user1Complete: true,
      user2Complete: false,
      date: new Date('2023-01-01'),
    },
    {
      id: 'eirurwot',
      user1Complete: false,
      user2Complete: false,
      date: new Date('2023-01-02'),
    },
    {
      id: 'cmgietiet',
      user1Complete: true,
      user2Complete: true,
      date: new Date('2023-01-03'),
    },
  ];

  constructor() {}
}

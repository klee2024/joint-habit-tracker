import { Component, inject, OnInit, signal } from '@angular/core';
import { HabitsService } from '../../services/habits.service';
import { HabitDay } from '../../model/habitDay.type';
import { catchError } from 'rxjs';
import { Habit } from '../../model/habit.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-past-days',
  imports: [CommonModule],
  templateUrl: './habit-past-days.component.html',
  styleUrl: './habit-past-days.component.css',
})
export class HabitPastDaysComponent implements OnInit {
  habitService = inject(HabitsService);
  habitItems = signal<Array<HabitDay>>([]);
  ngOnInit(): void {
    // this returns an observable
    this.habitService
      .getHabit('67edcb728fac06d8f2f5a7f2')
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((habit: Habit) => {
        console.log(habit);
        // TODO: figure out a better way for this
        this.habitItems.set(
          Array.isArray(habit.habitDays) ? habit.habitDays : [habit.habitDays]
        );
      });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { HabitTodayComponent } from '../habit-today/habit-today.component';
import { HabitPastDaysComponent } from '../habit-past-days/habit-past-days.component';
import { StreakCounterComponent } from '../streak-counter/streak-counter.component';
import { HabitsService } from '../../services/habits.service';
import { CommonModule } from '@angular/common';
import { Habit } from '../../model/habit.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-habit-main',
  imports: [
    HabitTodayComponent,
    HabitPastDaysComponent,
    StreakCounterComponent,
    CommonModule,
  ],
  templateUrl: './habit-main.component.html',
  styleUrl: './habit-main.component.css',
})
export class HabitMainComponent {
  habitService = inject(HabitsService);
  // TODO: look into a better way for this
  habit = signal<Habit>(null as unknown as Habit);
  ngOnInit(): void {
    this.habitService
      .getHabit('67edcb728fac06d8f2f5a7f2')
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((habit: Habit) => {
        console.log('main habit: ', habit);
        this.habit.set(habit);
      });
  }
}

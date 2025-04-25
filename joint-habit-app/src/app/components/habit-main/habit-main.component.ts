import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { HabitTodayComponent } from '../habit-today/habit-today.component';
import { HabitPastDaysComponent } from '../habit-past-days/habit-past-days.component';
import { StreakCounterComponent } from '../streak-counter/streak-counter.component';
import { HabitsService } from '../../services/habits.service';
import { CommonModule } from '@angular/common';
import { Habit } from '../../model/habit.type';
import { catchError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class HabitMainComponent implements OnInit, OnDestroy {
  // TODO: look into a better way to ensure values are initialized properly and not null

  habitService = inject(HabitsService);
  habit = signal<Habit>(null as unknown as Habit);
  habitId: string | null = null;
  private queryParamsSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.habitId = params['id'];
      }
    );
    if (this.habitId) {
      this.habitService
        .getHabit(this.habitId)
        .pipe(
          catchError((err) => {
            console.log('this is the error: ', err);
            throw err;
          })
        )
        .subscribe((habit: Habit) => {
          console.log('main habit: ', habit);
          this.habit.set(habit);
        });
    }
  }
  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}

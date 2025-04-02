import { Component } from '@angular/core';
import { HabitTodayComponent } from '../habit-today/habit-today.component';
import { HabitPastDaysComponent } from '../habit-past-days/habit-past-days.component';

@Component({
  selector: 'app-habit-main',
  imports: [HabitTodayComponent, HabitPastDaysComponent],
  templateUrl: './habit-main.component.html',
  styleUrl: './habit-main.component.css',
})
export class HabitMainComponent {}

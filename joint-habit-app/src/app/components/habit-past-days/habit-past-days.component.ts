import { Component, inject, OnInit, signal } from '@angular/core';
import { HabitsService } from '../../services/habits.service';
import { HabitDay } from '../../model/habitDay.type';

@Component({
  selector: 'app-habit-past-days',
  imports: [],
  templateUrl: './habit-past-days.component.html',
  styleUrl: './habit-past-days.component.css',
})
export class HabitPastDaysComponent implements OnInit {
  habitService = inject(HabitsService);
  habitItems = signal<Array<HabitDay>>([]);
  ngOnInit(): void {
    console.log(this.habitService.habitDays);
    this.habitItems.set(this.habitService.habitDays);
  }
}

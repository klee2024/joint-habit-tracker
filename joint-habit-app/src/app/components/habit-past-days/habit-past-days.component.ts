import { Component, inject, OnInit, signal, input } from '@angular/core';
import { HabitDay } from '../../model/habitDay.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-past-days',
  imports: [CommonModule],
  templateUrl: './habit-past-days.component.html',
  styleUrl: './habit-past-days.component.css',
})
export class HabitPastDaysComponent {
  pastDays = input<Array<HabitDay>>();
}

import { Component, inject, OnInit, signal, Input, input } from '@angular/core';
import { HabitDay } from '../../model/habitDay.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-tracker',
  imports: [CommonModule],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css',
})
export class HabitTrackerComponent {
  @Input() user1Id: string | null = null;
  @Input() user2Id: string | null = null;
  activeUser: string | null = null;
  homeUserChecked = false;
  habitId: string | null = null;

  pastDays = input<Array<HabitDay>>();
}

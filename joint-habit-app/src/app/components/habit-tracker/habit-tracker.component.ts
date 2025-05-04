import { Component, inject, OnInit, signal, Input, input } from '@angular/core';
import { HabitDay } from '../../model/habitDay.type';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.type';

@Component({
  selector: 'app-habit-tracker',
  imports: [CommonModule],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css',
})
export class HabitTrackerComponent {
  @Input() loggedInUserDetails: User | null = null;
  @Input() loggedInUser: 'user1' | 'user2' | null = null;
  @Input() partnerUser: User | null = null;
  homeUserChecked = false;
  habitId: string | null = null;

  pastDays = input<Array<HabitDay>>();
}

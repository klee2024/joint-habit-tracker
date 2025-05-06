import { Component, inject, OnInit, signal, Input, input } from '@angular/core';
import { HabitDay } from '../../model/habitDay.type';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.type';
import { HabitToday } from '../../model/habitToday.type';
import { HabitsService } from '../../services/habits.service';

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
  @Input() habitId: string | null = null;

  pastDays = input<Array<HabitDay>>();
  @Input() habitToday: HabitToday | null = null;

  private habitsService = inject(HabitsService);

  ngOnInit(): void {
    console.log(this.loggedInUser);
  }

  updateHabitToday(event: Event): void {
    console.log('update habit today was invoked');
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(isChecked);
    const userCompletedKey =
      this.loggedInUser === 'user1' ? 'user1Complete' : 'user2Complete';
    const updateHabitTodayBody =
      userCompletedKey === 'user1Complete'
        ? { user1Complete: isChecked }
        : { user2Complete: isChecked };
    console.log(updateHabitTodayBody);

    // making sure that habitId is not null
    if (!this.habitId) {
      console.error('Habit ID is not set.');
    } else {
      this.habitsService
        .updateHabitTodayById(this.habitId, updateHabitTodayBody)
        .subscribe({
          next: (updatedHabit) => {
            console.log('Habit updated successfully:', updatedHabit);
          },
          error: (err) => {
            console.error('Error updating habit:', err);
          },
        });
    }
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Habit } from '../../model/habit.type';
import { catchError } from 'rxjs';
import { HabitsService } from '../../services/habits.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-habits',
  imports: [CommonModule],
  templateUrl: './users-habits.component.html',
  styleUrl: './users-habits.component.css',
})
export class UsersHabitsComponent {
  habitService = inject(HabitsService);
  // get the user from local storage
  // get all their habits
  userId = localStorage.getItem('id');
  userHabits = signal<Array<Habit>>(null as unknown as [Habit]);

  constructor(private router: Router) {
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.habitService
      .getUserHabits(this.userId ?? '')
      .pipe(
        catchError((err) => {
          console.log('this is the error: ', err);
          throw err;
        })
      )
      .subscribe((habits: Habit[]) => {
        console.log('users habits: ', habits);
        this.userHabits.set(habits);
      });
  }
}

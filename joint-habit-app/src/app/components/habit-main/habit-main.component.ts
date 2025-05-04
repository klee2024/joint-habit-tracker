import {
  Component,
  inject,
  OnInit,
  signal,
  OnDestroy,
  Signal,
  computed,
} from '@angular/core';
import { HabitTrackerComponent } from '../habit-tracker/habit-tracker.component';
import { StreakCounterComponent } from '../streak-counter/streak-counter.component';
import { HabitsService } from '../../services/habits.service';
import { CommonModule } from '@angular/common';
import { Habit } from '../../model/habit.type';
import { catchError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habit-main',
  imports: [HabitTrackerComponent, StreakCounterComponent, CommonModule],
  templateUrl: './habit-main.component.html',
  styleUrl: './habit-main.component.css',
})
export class HabitMainComponent implements OnInit, OnDestroy {
  // TODO: look into a better way to ensure values are initialized properly and not null

  loggedInAs = signal<'user1' | 'user2' | null>(null);

  loggedInUser = computed(() => {
    const habit = this.habit();
    const role = this.loggedInAs();
    return habit && role ? habit[role] : null;
  });

  partnerUser = computed(() => {
    const habit = this.habit();
    const role = this.loggedInAs();
    if (!habit || !role) return null;

    const partnerRole = role === 'user1' ? 'user2' : 'user1';
    return habit[partnerRole];
  });

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
          // setting the users
          this.setUsers(habit);
        });
    }
  }
  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  setUsers(habit: Habit) {
    // get the logged in user from local storage
    const loggedInUserId = localStorage.getItem('id');
    if (
      loggedInUserId === habit.user1._id ||
      loggedInUserId === habit.user2._id
    ) {
      const role = loggedInUserId === habit.user1._id ? 'user1' : 'user2';
      this.loggedInAs.set(role);
    } else {
      console.warn('Logged-in user does not match user1 or user2');
      this.loggedInAs.set(null);
    }
  }
}

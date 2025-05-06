import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HabitMainComponent } from './components/habit-main/habit-main.component';
import { UsersHabitsComponent } from './components/users-habits/users-habits.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'habit', component: HabitMainComponent },
  { path: 'habits', component: UsersHabitsComponent },
];

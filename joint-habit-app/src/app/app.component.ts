import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HabitMainComponent } from './components/habit-main/habit-main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HabitMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'joint-habit-app';
}

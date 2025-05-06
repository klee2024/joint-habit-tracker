import { Component, input } from '@angular/core';

@Component({
  selector: 'app-streak-counter',
  imports: [],
  templateUrl: './streak-counter.component.html',
  styleUrl: './streak-counter.component.css',
})
export class StreakCounterComponent {
  streak = input<number>();
  total = input<number>();
}

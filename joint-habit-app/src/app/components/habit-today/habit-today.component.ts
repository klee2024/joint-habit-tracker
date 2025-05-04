import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habit-today',
  imports: [Input],
  templateUrl: './habit-today.component.html',
  styleUrl: './habit-today.component.css',
})
export class HabitTodayComponent implements OnInit {
  @Input() user1Id: string | null = null;
  @Input() user2Id: string | null = null;

  homeUserChecked = false;
  habitId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.habitId = this.route.snapshot.queryParamMap.get('id');
    if (this.habitId) {
      const savedState = localStorage.getItem(`habitComplete-${this.habitId}`);
      this.homeUserChecked = savedState === 'true';
    }
  }

  onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.homeUserChecked = isChecked;
    if (this.habitId) {
      localStorage.setItem(`habitComplete-${this.habitId}`, String(isChecked));
    }
  }
}

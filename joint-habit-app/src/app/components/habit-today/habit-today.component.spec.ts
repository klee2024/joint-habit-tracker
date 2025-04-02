import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitTodayComponent } from './habit-today.component';

describe('HabitTodayComponent', () => {
  let component: HabitTodayComponent;
  let fixture: ComponentFixture<HabitTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

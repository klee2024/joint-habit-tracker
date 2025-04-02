import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitPastDaysComponent } from './habit-past-days.component';

describe('HabitPastDaysComponent', () => {
  let component: HabitPastDaysComponent;
  let fixture: ComponentFixture<HabitPastDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitPastDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitPastDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

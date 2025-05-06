import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersHabitsComponent } from './users-habits.component';

describe('UsersHabitsComponent', () => {
  let component: UsersHabitsComponent;
  let fixture: ComponentFixture<UsersHabitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersHabitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

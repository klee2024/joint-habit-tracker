import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakCounterComponent } from './streak-counter.component';

describe('StreakCounterComponent', () => {
  let component: StreakCounterComponent;
  let fixture: ComponentFixture<StreakCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreakCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreakCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

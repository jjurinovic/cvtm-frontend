import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { TimeTrackingComponent } from './time-tracking.component';
import { DayComponent } from '../day/day.component';

describe('TimeTrackingComponent', () => {
  let component: TimeTrackingComponent;
  let fixture: ComponentFixture<TimeTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeTrackingComponent, DayComponent],
      imports: [MatCardModule, MatTabsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

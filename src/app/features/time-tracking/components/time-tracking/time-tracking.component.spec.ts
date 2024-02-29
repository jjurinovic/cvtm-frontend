import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TimeTrackingComponent } from './time-tracking.component';
import { DayComponent } from '../day/day.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DayTimeGridComponent } from '../day-time-grid/day-time-grid.component';

describe('TimeTrackingComponent', () => {
  let component: TimeTrackingComponent;
  let fixture: ComponentFixture<TimeTrackingComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeTrackingComponent, DayComponent, DayTimeGridComponent],
      imports: [SharedModule, BrowserAnimationsModule, FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TimeTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

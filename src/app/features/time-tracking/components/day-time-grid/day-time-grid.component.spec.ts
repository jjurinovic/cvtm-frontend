import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimeGridComponent } from './day-time-grid.component';

describe('DayTimeGridComponent', () => {
  let component: DayTimeGridComponent;
  let fixture: ComponentFixture<DayTimeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayTimeGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayTimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

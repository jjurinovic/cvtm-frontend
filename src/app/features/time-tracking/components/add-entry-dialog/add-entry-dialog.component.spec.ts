import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { AddEntryDialogComponent } from './add-entry-dialog.component';

describe('AddEntryDialogComponent', () => {
  let component: AddEntryDialogComponent;
  let fixture: ComponentFixture<AddEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEntryDialogComponent],
      imports: [MatDialogModule, MatInputModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

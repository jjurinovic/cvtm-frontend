import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AdminComponent } from './admin.component';
import { CompanyListComponent } from '../company-list/company-list.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent, CompanyListComponent],
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

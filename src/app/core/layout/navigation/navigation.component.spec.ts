import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

const testLinks = [
  { link: 'test1', title: 'Test 1' },
  { link: 'test2', title: 'Test 2' },
  { link: 'test3', title: 'Test 3' },
];

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [MatListModule, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-nav-list', () => {
    const matNav = fixture.debugElement.query(By.css('mat-nav-list'));
    expect(matNav).toBeTruthy();
  });

  it('should render 3 navigation items', () => {
    component.links = testLinks;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.navigation-item'));

    expect(items.length).toEqual(3);
  });
});

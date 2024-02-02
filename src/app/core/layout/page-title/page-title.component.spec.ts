import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageTitleComponent } from './page-title.component';

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct title in html', () => {
    component.pageTitle = 'test';
    fixture.detectChanges();

    const pageTitleH2 = fixture.debugElement.query(By.css('.page-title'));

    expect(pageTitleH2.nativeElement.textContent).toEqual('test');
  });
});

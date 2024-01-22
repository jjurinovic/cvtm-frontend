import { Component, DebugElement } from '@angular/core';
import { HasRoleDirective } from './has-role.directive';
import { Role } from 'src/app/features/users/enums/role.enum';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  standalone: true,
  template: `
    <div>
      <div class="test" *appHasRole="role"></div>
    </div>
  `,
  imports: [HasRoleDirective],
})
class TestComponent {
  role: Role = Role.USER;
}

describe('HasRoleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let service: AuthService;
  let div: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HasRoleDirective, TestComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(TestComponent);
    service = TestBed.inject(AuthService);
  });

  it('should show element when user role is ROOT and min role is USER', () => {
    service.setRole(Role.ROOT);
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('div'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is ADMIN and min role is USER', () => {
    service.setRole(Role.ADMIN);
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is MODERATOR and min role is USER', () => {
    div = fixture.debugElement.query(By.css('.test'));

    service.setRole(Role.MODERATOR);
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is USER and min role is USER', () => {
    service.setRole(Role.USER);
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));
    expect(div).toBeTruthy();
  });

  it('should show element when user role is ROOT and min role is MODERATOR', () => {
    service.setRole(Role.ROOT);

    fixture.detectChanges();
    fixture.componentInstance.role = Role.MODERATOR;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is ADMIN and min role is MODERATOR', () => {
    service.setRole(Role.ADMIN);

    fixture.componentInstance.role = Role.MODERATOR;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is MODERATOR and min role is MODERATOR', () => {
    service.setRole(Role.MODERATOR);

    fixture.componentInstance.role = Role.MODERATOR;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is USER and min role is MODERATOR', () => {
    service.setRole(Role.USER);

    fixture.componentInstance.role = Role.MODERATOR;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.directive(HasRoleDirective));

    expect(div).toBeNull();
  });

  it('should show element when user role is ROOT and min role is ADMIN', () => {
    service.setRole(Role.ROOT);

    fixture.detectChanges();
    fixture.componentInstance.role = Role.ADMIN;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is ADMIN and min role is ADMIN', () => {
    service.setRole(Role.ADMIN);

    fixture.componentInstance.role = Role.ADMIN;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is MODERATOR and min role is ADMIN', () => {
    service.setRole(Role.MODERATOR);

    fixture.componentInstance.role = Role.ADMIN;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeNull();
  });

  it('should show element when user role is USER and min role is ADMIN', () => {
    service.setRole(Role.USER);

    fixture.componentInstance.role = Role.ADMIN;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.directive(HasRoleDirective));

    expect(div).toBeNull();
  });

  it('should show element when user role is ROOT and min role is ROOT', () => {
    service.setRole(Role.ROOT);

    fixture.detectChanges();
    fixture.componentInstance.role = Role.ROOT;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeTruthy();
  });

  it('should show element when user role is ADMIN and min role is ROOT', () => {
    service.setRole(Role.ADMIN);

    fixture.componentInstance.role = Role.ROOT;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeNull();
  });

  it('should show element when user role is MODERATOR and min role is ROOT', () => {
    service.setRole(Role.MODERATOR);

    fixture.componentInstance.role = Role.ROOT;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.css('.test'));

    expect(div).toBeNull();
  });

  it('should show element when user role is USER and min role is ROOT', () => {
    service.setRole(Role.USER);

    fixture.componentInstance.role = Role.ROOT;
    fixture.detectChanges();
    div = fixture.debugElement.query(By.directive(HasRoleDirective));

    expect(div).toBeNull();
  });
});

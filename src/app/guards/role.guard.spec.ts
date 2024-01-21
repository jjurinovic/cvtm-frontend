import { TestBed } from '@angular/core/testing';
import { AuthService } from '../core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Role } from '../features/users/enums/role.enum';
import { roleGuard } from './role.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('RoleGuard', () => {
  let service: AuthService;

  let rootRoute = new ActivatedRouteSnapshot();
  rootRoute.data = { role: Role.ROOT };

  let adminRoute = new ActivatedRouteSnapshot();
  adminRoute.data = { role: Role.ADMIN };

  let moderatorRouter = new ActivatedRouteSnapshot();
  moderatorRouter.data = { role: Role.MODERATOR };

  let userRoute = new ActivatedRouteSnapshot();
  userRoute.data = { role: Role.USER };

  let runGuard = (route: ActivatedRouteSnapshot) =>
    TestBed.runInInjectionContext(() => {
      return roleGuard(route, { url: '' } as RouterStateSnapshot);
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [],
    });

    service = TestBed.inject(AuthService);
  });

  it('should return true, user: ROOT and allowed ROOT', () => {
    service.setRole(Role.ROOT);
    const guardResponse = runGuard(rootRoute);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: ROOT and allowed ADMIN', () => {
    service.setRole(Role.ROOT);
    const guardResponse = runGuard(adminRoute);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: ROOT and allowed MODERATOR', () => {
    service.setRole(Role.ROOT);
    const guardResponse = runGuard(moderatorRouter);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: ROOT and allowed USER', () => {
    service.setRole(Role.ROOT);
    const guardResponse = runGuard(userRoute);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: ADMIN and allowed ROOT', () => {
    service.setRole(Role.ADMIN);
    const guardResponse = runGuard(rootRoute);

    expect(guardResponse).toBeFalse();
  });

  it('should return true, user: ADMIN and allowed ADMIN', () => {
    service.setRole(Role.ADMIN);
    const guardResponse = runGuard(adminRoute);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: ADMIN and allowed MODERATOR', () => {
    service.setRole(Role.ADMIN);
    const guardResponse = runGuard(moderatorRouter);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: ADMIN and allowed USER', () => {
    service.setRole(Role.ADMIN);
    const guardResponse = runGuard(userRoute);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: MODERATOR and allowed ROOT', () => {
    service.setRole(Role.MODERATOR);
    const guardResponse = runGuard(rootRoute);

    expect(guardResponse).toBeFalse();
  });

  it('should return true, user: MODERATOR and allowed ADMIN', () => {
    service.setRole(Role.MODERATOR);
    const guardResponse = runGuard(adminRoute);

    expect(guardResponse).toBeFalse();
  });

  it('should return true, user: MODERATOR and allowed MODERATOR', () => {
    service.setRole(Role.MODERATOR);
    const guardResponse = runGuard(moderatorRouter);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: MODERATOR and allowed USER', () => {
    service.setRole(Role.MODERATOR);
    const guardResponse = runGuard(userRoute);

    expect(guardResponse).toBeTrue();
  });

  it('should return true, user: USER and allowed ROOT', () => {
    service.setRole(Role.USER);
    const guardResponse = runGuard(rootRoute);

    expect(guardResponse).toBeFalse();
  });

  it('should return true, user: USER and allowed ADMIN', () => {
    service.setRole(Role.USER);
    const guardResponse = runGuard(adminRoute);

    expect(guardResponse).toBeFalse();
  });

  it('should return true, user: USER and allowed MODERATOR', () => {
    service.setRole(Role.USER);
    const guardResponse = runGuard(moderatorRouter);

    expect(guardResponse).toBeFalse();
  });

  it('should return true, user: USER and allowed USER', () => {
    service.setRole(Role.USER);
    const guardResponse = runGuard(userRoute);

    expect(guardResponse).toBeTrue();
  });
});

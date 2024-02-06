import { Role } from 'src/app/features/users/enums/role.enum';
import { RolePipe } from './role.pipe';

describe('RolePipe', () => {
  const pipe = new RolePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return ROOT for value of Role.ROOT', () => {
    expect(pipe.transform(Role.ROOT)).toEqual('ROOT');
  });

  it('should return ADMIN for value Role.ADMIN', () => {
    expect(pipe.transform(Role.ADMIN)).toEqual('ADMIN');
  });

  it('should return MODERATOR for value Role.MODERATOR', () => {
    expect(pipe.transform(Role.MODERATOR)).toEqual('MODERATOR');
  });

  it('should return USER for value Role.USER', () => {
    expect(pipe.transform(Role.USER)).toEqual('USER');
  });
});

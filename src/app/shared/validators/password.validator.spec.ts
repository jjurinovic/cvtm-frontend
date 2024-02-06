import { FormControl, FormGroup } from '@angular/forms';
import { passwordValidator } from './password.validator';

describe('passwordValidator', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      repeat_password: new FormControl(),
      new_password: new FormControl(),
    });
  });

  it('should return null when passwords are not defined', () => {
    formGroup.patchValue({ new_password: 'test', repeat_password: 'test' });
    expect(passwordValidator(formGroup)).toBeFalsy();
    expect(passwordValidator(formGroup)).toEqual(null);
  });

  it('should return null when passwords are same', () => {
    formGroup.patchValue({ new_password: 'test', repeat_password: 'test' });
    expect(passwordValidator(formGroup)).toBeFalsy();
    expect(passwordValidator(formGroup)).toEqual(null);
  });

  it('should return object when passwords are not same', () => {
    formGroup.patchValue({
      repeat_password: 'test',
      new_password: 'not',
    });
    expect(passwordValidator(formGroup)).toBeTruthy();
    expect(passwordValidator(formGroup)).toEqual({ passwordNoMatch: true });
  });
});

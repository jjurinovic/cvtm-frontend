import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.new_password === control.value.repeat_password
    ? null
    : { passwordNoMatch: true };
};

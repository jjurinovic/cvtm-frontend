import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const timeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const startTime = control.value.start_time;
  const endTime = control.value.end_time;

  const startMoment = moment(startTime, [moment.ISO_8601, 'HH:mm']);
  const endMoment = moment(endTime, [moment.ISO_8601, 'HH:mm']);

  const diff = endMoment.diff(startMoment);
  if (diff < 0) {
    control.get('start_time')?.setErrors({ timeError: true });
    control.get('end_time')?.setErrors({ timeError: true });
  } else {
    control.get('start_time')?.setErrors(null);
    control.get('end_time')?.setErrors(null);
  }

  return diff > 0 ? null : { timeError: true };
};

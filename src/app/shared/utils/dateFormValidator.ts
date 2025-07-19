import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const date = new Date(value);
  if (value && date == undefined) {
    return { invalidDate: true };
  }
  return null;
}

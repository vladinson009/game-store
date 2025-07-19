import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  //   if (value === null || value === undefined || value === '') return null;

  return isNaN(Number(value)) ? { notANumber: true } : null;
}

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!Number(value)) {
    return { notANumber: true };
  } else return null;
}

import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom control form validator
export function numberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!Number(value)) {
    return { notANumber: true };
  } else return null;
}

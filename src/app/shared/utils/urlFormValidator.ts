import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }
  try {
    new URL(value);
    return null;
  } catch (error) {
    return { invalidUrl: true };
  }
}

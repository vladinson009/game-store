import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom control form validator
export function minSelectedValidator(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (Array.isArray(value) && value.length >= min) {
      return null;
    }
    return { minSelected: true };
  };
}

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Custom control form validator
export function matchPasswordValidator(
  passwordKey: string,
  repassKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const passwordControl = group.get(passwordKey);
    const repassControl = group.get(repassKey);

    if (!passwordControl || !repassControl) {
      return null;
    }
    const password = passwordControl.value;
    const repass = repassControl.value;

    if (password === repass) {
      repassControl.setErrors(null);
      return null;
    } else {
      const error = { passwordsMismatch: true };
      repassControl.setErrors(error);
      return error;
    }
  };
}

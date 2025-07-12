import { FormControl } from '@angular/forms';

export interface LoginUserForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
export interface RegisterUserForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  repass: FormControl<string>;
}

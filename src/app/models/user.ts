import { FormControl } from '@angular/forms';

//* Form Control Interfaces
interface AuthFormBase {
  username: FormControl<string>;
  password: FormControl<string>;
}
export interface LoginUserForm extends AuthFormBase {}
export interface RegisterUserForm extends AuthFormBase {
  email: FormControl<string>;
  repass: FormControl<string>;
}

//* User Credentials Interfaces
interface AuthCredentialsBase {
  username: string;
  password: string;
}
export interface LoginCredentials extends AuthCredentialsBase {}
export interface RegisterCredentials extends AuthCredentialsBase {
  email: string;
  repass: string;
}
//* Auth User Response Interface
export interface AuthUserResponse {
  token: string;
  _id: string;
  username: string;
  email: string;
  role: string;
}

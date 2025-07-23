import { RouterLink } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//? Material
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { RegisterCredentials, RegisterUserForm } from '../../../models/user';
import { matchPasswordValidator } from '../../../shared/utils/repassValidator';
import slideAnimation from '../../../animations/slideAnimation';
import { AuthService } from '../../../core/services/auth.service';
import { FocusInput } from '../../../shared/directives/focus-input.directive';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    RouterLink,
    FocusInput,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  animations: [slideAnimation(600, 'X')],
})
export class Register implements OnInit {
  public registerForm: FormGroup<RegisterUserForm> | undefined;
  private _serverErrorMessageSignal = signal<string | null>(null);
  public serverErrorMessageSignal = this._serverErrorMessageSignal.asReadonly();
  public isLoading = signal(false);
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  private buildForm() {
    this.registerForm = this.fb.nonNullable.group(
      {
        username: this.fb.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        email: this.fb.nonNullable.control('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.email,
          ],
        }),
        password: this.fb.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        repass: this.fb.nonNullable.control('', {
          validators: [Validators.required],
        }),
      },
      { validators: [matchPasswordValidator('password', 'repass')] }
    );
  }

  public registerFormHandler() {
    if (!this.registerForm || this.registerForm.invalid) {
      return;
    }
    const { username, password, email, repass } = this.registerForm.value;
    const credentials: RegisterCredentials = {
      username: username ?? '',
      password: password ?? '',
      email: email ?? '',
      repass: repass ?? '',
    };
    this.isLoading.set(true);
    this.authService
      .register(credentials)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        error: (err) => {
          this.registerForm?.controls.password.reset();
          this.registerForm?.controls.repass.reset();
          this._serverErrorMessageSignal.set(err.error.error);
        },
      });
  }

  public resetInput(
    event: MouseEvent,
    inputName: keyof RegisterUserForm
  ): void {
    event.preventDefault();
    this.registerForm?.get(inputName)?.setValue('');
  }
  ngOnInit(): void {
    this.buildForm();
  }
}

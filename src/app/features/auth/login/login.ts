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

import slideAnimation from '../../../animations/slideAnimation';
import { LoginCredentials, LoginUserForm } from '../../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { FocusInput } from '../../../shared/directives/focus-input.directive';

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
  templateUrl: './login.html',
  styleUrl: './login.css',
  animations: [slideAnimation(600, 'X')],
})
export class Login implements OnInit {
  public loginForm: FormGroup<LoginUserForm> | undefined;
  private _serverErrorMessageSignal = signal<string | null>(null);
  public serverErrorMessageSignal = this._serverErrorMessageSignal.asReadonly();

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  private buildForm() {
    this.loginForm = this.fb.nonNullable.group({
      username: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      password: this.fb.nonNullable.control<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  }
  public loginFormHandler() {
    if (!this.loginForm || this.loginForm.invalid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    const credentials: LoginCredentials = {
      username: username ?? '',
      password: password ?? '',
    };
    this.authService.login(credentials).subscribe({
      error: (err) => {
        this.loginForm?.controls.password.reset();
        this._serverErrorMessageSignal.set(err.error.error);
      },
    });
  }
  public resetInput(event: MouseEvent, inputName: keyof LoginUserForm): void {
    event.preventDefault();
    this.loginForm?.get(inputName)?.setValue('');
  }
  ngOnInit(): void {
    this.buildForm();
  }
}

import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//? Material
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { RegisterCredentials, RegisterUserForm } from '../../../models/user';
import { matchPasswordValidator } from '../../../shared/utils/repassValidator';
import slideAnimation from '../../../animations/slideAnimation';
import { AuthService } from '../../../core/services/auth.service';

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
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  animations: [slideAnimation(600, 'X')],
})
export class Register implements OnInit {
  public registerForm: FormGroup<RegisterUserForm> | undefined;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  private buildForm() {
    this.registerForm = this.fb.nonNullable.group(
      {
        username: this.fb.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(3)],
          // updateOn: 'blur',
        }),
        email: this.fb.nonNullable.control('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.email,
          ],
          // updateOn: 'blur',
        }),
        password: this.fb.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(3)],
          // updateOn: 'change',
        }),
        repass: this.fb.nonNullable.control('', {
          validators: [Validators.required],
          // updateOn: 'change',
        }),
      },
      { validators: [matchPasswordValidator('password', 'repass')] }
    );
  }

  public resetInput(event: MouseEvent, inputName: string): void {
    event.preventDefault();
    this.registerForm?.get(inputName)?.setValue('');
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
    this.authService.register(credentials).subscribe();
  }
  ngOnInit(): void {
    this.buildForm();
  }
}

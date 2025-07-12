import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
import { LoginUserForm } from '../../../models/user';

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
  templateUrl: './login.html',
  styleUrl: './login.css',
  animations: [slideAnimation(600, 'X')],
})
export class Login implements OnInit {
  public loginForm: FormGroup<LoginUserForm> | undefined;
  constructor(private fb: FormBuilder) {}

  private buildForm() {
    this.loginForm = this.fb.nonNullable.group({
      username: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        // updateOn: 'change',
      }),
      password: this.fb.nonNullable.control<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
        // updateOn: 'change',
      }),
    });
  }
  public alert() {
    alert('asd');
  }
  public resetInput(event: MouseEvent, inputName: string): void {
    event.preventDefault();
    this.loginForm?.get(inputName)?.setValue('');
  }
  ngOnInit(): void {
    this.buildForm();
  }
}

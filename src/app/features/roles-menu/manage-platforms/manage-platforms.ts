import type { PlatformData } from '../../../models/platform';

import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// ? Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

import { PlatformService } from '../../../core/services/platform.service';
import slideAnimation from '../../../animations/slideAnimation';
import { AuthService } from '../../../core/services/auth.service';
import { urlValidator } from '../../../shared/utils/urlFormValidator';

@Component({
  selector: 'app-manage-platforms',
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInput,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './manage-platforms.html',
  styleUrl: './manage-platforms.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class ManagePlatforms {
  manageForm: FormGroup | undefined;
  displayedColumns = ['_id', 'author', 'name', 'actions'];
  platforms = signal<PlatformData[] | undefined>(undefined);
  inputControl: { [id: string]: FormControl } = {};
  author: string;

  constructor(
    private platformService: PlatformService,
    private authService: AuthService
  ) {
    const auth = this.authService.user()?._id;
    this.author = auth ?? '';

    this.manageForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      imageUrl: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        urlValidator,
      ]),
    });
  }

  ngOnInit(): void {
    this.platformService.getAll().subscribe((res) => {
      this.platforms.set(res.data);
      this.platforms()?.forEach((el) => {
        this.inputControl[el._id] = new FormControl('');
      });
    });
  }
  updatePlatforms(platformId: string) {
    const inputField = this.inputControl[platformId];
    this.platformService
      .editPlatform(platformId, { name: inputField.value })
      .subscribe((res) => {
        this.platforms.update((prevValue) => {
          const newValue = prevValue?.slice();
          const item = newValue?.find((el) => el._id === platformId);
          if (item) {
            item.name = inputField.value;
          }
          inputField.reset();
          return newValue;
        });
      });
  }
  deletePlatform(platformId: string, platformName: string) {
    this.platformService
      .deletePlatform(platformId, platformName)
      .subscribe((res) => {
        this.platforms.update((prevValue) =>
          prevValue?.filter((el) => el._id !== platformId)
        );
      });
  }
  createPlatform() {
    if (this.manageForm?.invalid) {
      return;
    }
    const author = this.author;
    const data = { ...this.manageForm?.value, author };
    this.platformService.create(data).subscribe(() => {
      this.manageForm?.reset();
      Object.values(this.manageForm?.controls ?? {}).forEach((control) => {
        control.markAsUntouched();
        control.setErrors(null);
      });
    });
  }
}

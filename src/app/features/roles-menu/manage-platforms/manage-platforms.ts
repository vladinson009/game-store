import type { PlatformData } from '../../../models/platform';

import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// ? Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

import { PlatformService } from '../../../core/services/platform.service';
import slideAnimation from '../../../animations/slideAnimation';

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
  displayedColumns = ['_id', 'author', 'name', 'actions'];
  platforms = signal<PlatformData[] | undefined>(undefined);
  inputControl: { [id: string]: FormControl } = {};

  constructor(private platformService: PlatformService) {}

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
}

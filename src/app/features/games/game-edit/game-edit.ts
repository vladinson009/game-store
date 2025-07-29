import type {
  CategoriesFromGame,
  EditGameFormat,
  PlatformsFromGame,
} from '../../../models/game';
import type { PlatformData } from '../../../models/platform';
import type { CategoriesData } from '../../../models/categories';
import type { ImgBBUploadResponse } from '../../../models/imageUpload';

import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';

// ? Material
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { GameService } from '../../../core/services/game.service';
import { AuthService } from '../../../core/services/auth.service';
import { PlatformService } from '../../../core/services/platform.service';
import { CategoryService } from '../../../core/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { FocusInput } from '../../../shared/directives/focus-input.directive';
import slideAnimation from '../../../animations/slideAnimation';
import { numberValidator } from '../../../shared/utils/numberValidator';
import { dateValidator } from '../../../shared/utils/dateFormValidator';

@Component({
  selector: 'app-game-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    FocusInput,
    MatProgressSpinner,
  ],
  templateUrl: './game-edit.html',
  styleUrl: './game-edit.css',
  animations: [slideAnimation(600, 'X')],
})
export class GameEdit implements OnInit {
  public editGameForm: FormGroup<EditGameFormat> | undefined;
  private _serverErrorMessageSignal = signal<string | null>(null);
  public serverErrorMessageSignal = this._serverErrorMessageSignal.asReadonly();
  public platforms: PlatformData[] = [];
  public categories: CategoriesData[] = [];
  public isLoading = signal(false);
  public imageUrl = signal('');
  public gameId = '';

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private authService: AuthService,
    private platformService: PlatformService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.editGameForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      price: this.fb.nonNullable.control<number | undefined>(undefined, {
        validators: [numberValidator, Validators.required, Validators.min(1)],
      }),
      releaseDate: this.fb.nonNullable.control<Date | undefined | string>(
        undefined,
        { validators: [dateValidator, Validators.required] }
      ),
      image: this.fb.nonNullable.control<File | null>(null),
      categories: this.fb.nonNullable.control<string[]>([]),
      platforms: this.fb.nonNullable.control<string[]>([]),
    });
  }
  public editGameHandler() {
    if (!this.editGameForm || this.editGameForm.invalid) {
      return;
    }

    const {
      title,
      description,
      price,
      image,
      releaseDate,
      platforms,
      categories,
    } = this.editGameForm.value;

    const userInput = {
      title: title ?? '',
      description: description ?? '',
      price: price ?? 0,
      author: this.authService.user()!._id,
      releaseDate: releaseDate ?? new Date(),
      platforms: platforms ?? [],
      categories: categories ?? [],
    };
    const formData = new FormData();

    this.isLoading.set(true);
    if (image) {
      formData.append('image', image, image.name);
      formData.append('key', 'c0f89984ba2349c19405d4fbd9c3e0c2');
      this.gameService
        .uploadImage(formData)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (res: ImgBBUploadResponse) => {
            const imageUrl = res.data.url;
            const reqData = { ...userInput, imageUrl };
            this.gameService.editGame(this.gameId, reqData).subscribe({
              error: (err) => {
                this._serverErrorMessageSignal.set(err.error.error);
              },
            });
          },
          error: (err) => {
            console.error('ImgBB upload failed', err);
            this._serverErrorMessageSignal.set('Image upload failed');
          },
        });
    } else {
      const reqData = { ...userInput, imageUrl: this.imageUrl() };
      this.gameService.editGame(this.gameId, reqData).subscribe({
        error: (err) => {
          this._serverErrorMessageSignal.set(err.error.error);
        },
      });
    }
  }
  public resetInput(event: MouseEvent, inputName: keyof EditGameFormat): void {
    event.preventDefault();
    if (inputName === 'image') {
      this.editGameForm?.get('image')?.setValue(null);
    } else {
      this.editGameForm?.get(inputName)?.setValue('');
    }
  }
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.editGameForm?.get('image')?.setValue(file);
      this.editGameForm?.get('image')?.markAsDirty();
      this.editGameForm?.get('image')?.updateValueAndValidity();
    }
  }
  public getPlatforms() {
    this.platformService
      .getAll()
      .subscribe((res) => (this.platforms = res.data));
  }
  public getCategories() {
    this.categoryService
      .getAll()
      .subscribe((res) => (this.categories = res.data));
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const gameId = params.get('gameId');
      this.gameId = gameId ?? '';
      this.getCategories();
      this.getPlatforms();
      if (gameId) {
        this.gameService.getById(gameId).subscribe((game) => {
          const {
            title,
            description,
            price,
            releaseDate,
            platforms,
            categories,
            imageUrl,
          } = game;
          this.imageUrl.set(imageUrl);

          this.editGameForm?.patchValue({
            title,
            description,
            price,
            releaseDate: releaseDate
              ? new Date(releaseDate).toISOString().slice(0, 10)
              : '',
            platforms: (platforms ?? []).map((p: PlatformsFromGame) => p._id),
            categories: (categories ?? []).map(
              (c: CategoriesFromGame) => c._id
            ),
          });
        });
      }
    });
  }
}

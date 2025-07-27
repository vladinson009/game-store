import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FocusInput } from '../../../shared/directives/focus-input.directive';
import { CreateGameFormat } from '../../../models/game';
import { dateValidator } from '../../../shared/utils/dateFormValidator';
import { urlValidator } from '../../../shared/utils/urlFormValidator';
import { GameService } from '../../../core/services/game.service';
import slideAnimation from '../../../animations/slideAnimation';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PlatformService } from '../../../core/services/platform.service';
import {
  PlatformData,
  PlatformsCollectionResponse,
} from '../../../models/platform';
import { minSelectedValidator } from '../../../shared/utils/minSelectedValidator';
import { numberValidator } from '../../../shared/utils/numberValidator';
import { CategoriesData } from '../../../models/categories';
import { CategoryService } from '../../../core/services/category.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { ImgBBUploadResponse } from '../../../models/imageUpload';

@Component({
  selector: 'app-create-game',
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
  templateUrl: './create-game.html',
  styleUrl: './create-game.css',
  animations: [slideAnimation(600, 'X')],
})
export class CreateGame implements OnInit {
  public createGameForm: FormGroup<CreateGameFormat> | undefined;
  private _serverErrorMessageSignal = signal<string | null>(null);
  public serverErrorMessageSignal = this._serverErrorMessageSignal.asReadonly();
  public platforms: PlatformData[] = [];
  public categories: CategoriesData[] = [];
  public isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private authService: AuthService,
    private platformService: PlatformService,
    private categoryService: CategoryService
  ) {}

  private buildForm() {
    this.createGameForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      price: this.fb.nonNullable.control<number | undefined>(undefined, {
        validators: [numberValidator, Validators.required, Validators.min(1)],
      }),
      releaseDate: this.fb.nonNullable.control<Date | undefined>(undefined, {
        validators: [dateValidator, Validators.required],
      }),
      image: this.fb.nonNullable.control<File | null>(null, {
        validators: [Validators.required],
      }),
      categories: this.fb.nonNullable.control<string[]>([], {
        validators: [],
      }),
      platforms: this.fb.nonNullable.control<string[]>([], {
        validators: [],
      }),
    });
  }

  public createGameHandler() {
    if (!this.createGameForm || this.createGameForm.invalid) {
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
    } = this.createGameForm.value;

    if (!image) {
      console.log('No image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('key', 'c0f89984ba2349c19405d4fbd9c3e0c2');

    this.isLoading.set(true);

    this.gameService
      .uploadImage(formData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res: ImgBBUploadResponse) => {
          const imageUrl = res.data.url;

          const userInput = {
            title: title ?? '',
            description: description ?? '',
            price: price ?? 0,
            author: this.authService.user()!._id,
            imageUrl: imageUrl,
            releaseDate: releaseDate ?? new Date(),
            platforms: platforms ?? [],
            categories: categories ?? [],
          };
          this.gameService.createGame(userInput).subscribe({
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
  }
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.createGameForm?.get('image')?.setValue(file);
      this.createGameForm?.get('image')?.markAsDirty();
      this.createGameForm?.get('image')?.updateValueAndValidity();
    }
  }
  public resetInput(
    event: MouseEvent,
    inputName: keyof CreateGameFormat
  ): void {
    event.preventDefault();
    if (inputName === 'image') {
      this.createGameForm?.get('image')?.setValue(null);
    } else {
      this.createGameForm?.get(inputName)?.setValue('');
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
  public isPlatformSelected(id: string): boolean {
    return this.createGameForm?.value.platforms?.includes(id) || false;
  }
  ngOnInit(): void {
    this.getPlatforms();
    this.getCategories();
    this.buildForm();
  }
}

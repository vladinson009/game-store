import { Component, OnInit, Output, EventEmitter, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import { FocusInput } from '../../../shared/directives/focus-input.directive';
import { MatIconButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-game-searchbar',
  imports: [
    MatFormField,
    MatIcon,
    MatLabel,
    MatInput,
    FocusInput,
    MatSuffix,
    MatIconButton,
    ReactiveFormsModule,
  ],
  templateUrl: './game-searchbar.html',
  styleUrl: './game-searchbar.css',
})
export class GameSearchbar implements OnInit {
  searchForm: FormGroup | undefined;

  criteria = output<string>();

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
    this.childEmitter();
  }

  childEmitter() {
    this.searchForm
      ?.get('search')
      ?.valueChanges.pipe(debounceTime(1500))
      .subscribe((value: string) => {
        this.criteria.emit(value);
      });
  }
}

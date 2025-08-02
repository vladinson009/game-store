import { Component, OnInit, output } from '@angular/core';
import { debounceTime } from 'rxjs';

// ? Material
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FocusInput } from '../../../shared/directives/focus-input.directive';

@Component({
  selector: 'app-game-searchbar',
  imports: [MatFormField, MatLabel, MatInput, FocusInput, ReactiveFormsModule],
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
  // Event emitter to parent component
  childEmitter() {
    this.searchForm
      ?.get('search')
      ?.valueChanges.pipe(debounceTime(1500))
      .subscribe((value: string) => {
        this.criteria.emit(value);
      });
  }
}

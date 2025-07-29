import type { Pagination } from '../../../models/pagination';
import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ? Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-paginator',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  public pagination = input<Pagination | null>();
  public pageChanged = output<PageEvent>();
  public pageIndex = computed(() => (this.pagination()?.page || 1) - 1);

  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.pageChanged.emit(e);
  }
}

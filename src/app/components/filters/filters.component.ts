import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AnimeFilters } from '../../interfaces/filters';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() filtersChanged = new EventEmitter<AnimeFilters>();
  
  filtersForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      search: [''],
      status: [''],
      ageRating: ['']
    });
  }

  ngOnInit() {
    // Escuchar cambios en los selectores
    this.filtersForm.get('status')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());

    this.filtersForm.get('ageRating')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch() {
    this.applyFilters();
  }

  onEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.applyFilters();
    }
  }

  private applyFilters() {
    const filters = this.cleanFilters(this.filtersForm.value);
    this.filtersChanged.emit(filters);
  }

  private cleanFilters(filters: AnimeFilters): AnimeFilters {
    const cleanedFilters: AnimeFilters = {};
  
    // if (filters.search?.trim()) {
    cleanedFilters.search = filters.search?.trim();
    // }
    if (filters.status) {
      cleanedFilters.status = filters.status;
    }
    if (filters.ageRating) {
      cleanedFilters.ageRating = filters.ageRating;
    }

    return cleanedFilters;
  }
} 
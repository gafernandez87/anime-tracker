import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeFilters } from '../../interfaces/filters';
import { FiltersComponent } from '../filters/filters.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FiltersComponent,
    TranslatePipe,
    SpinnerComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  animes: Anime[] = [];
  loading = false;
  error = false;
  currentPage = 1;
  hasMorePages = true;
  private destroy$ = new Subject<void>();
  private currentFilters: AnimeFilters = {};
  private scrollThreshold = 200; // píxeles antes del final para cargar más

  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    this.loadAnimes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.shouldLoadMore()) {
      this.loadMore();
    }
  }

  private shouldLoadMore(): boolean {
    if (this.loading || !this.hasMorePages) {
      return false;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    return documentHeight - scrollPosition < this.scrollThreshold;
  }

  loadAnimes(filters: AnimeFilters = {}) {
    this.loading = true;
    this.error = false;
    this.currentFilters = filters;

    this.animeService.getAnimes(this.currentPage, filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.animes = this.currentPage === 1 
            ? response.data 
            : [...this.animes, ...response.data];
          this.hasMorePages = this.currentPage < response.pagination.totalPages;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

  private loadMore() {
    if (!this.loading && this.hasMorePages) {
      this.currentPage++;
      this.loadAnimes(this.currentFilters);
    }
  }

  onFiltersChanged(filters: AnimeFilters) {
    this.currentPage = 1;
    this.loadAnimes(filters);
  }

  parseFloat(value: string): number {
    return Number.parseFloat(value);
  }
} 
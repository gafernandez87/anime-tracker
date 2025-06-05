import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeFilters } from '../../interfaces/filters';
import { FiltersComponent } from '../filters/filters.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { AnimeCardComponent } from "../anime-card/anime-card.component";
import { AuthService } from '../../services/auth.service';


type AnimeFav = Anime & { isFavorite: boolean; };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AnimeCardComponent,
    FiltersComponent,
    TranslatePipe,
    SpinnerComponent,
    AnimeCardComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  animes: AnimeFav[] = [];
  loading = false;
  error = false;
  currentPage = 1;
  hasMorePages = true;

  private destroy$ = new Subject<void>();
  private currentFilters: AnimeFilters = {};
  private scrollThreshold = 200; // píxeles antes del final para cargar más

  constructor(private authService: AuthService, private animeService: AnimeService) {}

  ngOnInit() {
    this.loadAnimes();
    if(this.authService.isAuthenticated()) {
      this.loadFavoriteAnimes();
    }
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
          const pageData = response.data.map(anime => ({ ...anime, isFavorite: false } as AnimeFav));
          this.animes = this.currentPage === 1 
            ? pageData
            : [...this.animes, ...pageData];
          this.hasMorePages = this.currentPage < response.pagination.totalPages;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

  private loadFavoriteAnimes() {
    this.animeService.getFavoriteAnimes()
      .subscribe({
        next: (favorites: Anime[]) => {
          this.animes = this.animes.map(anime => {
            const isFavorite = favorites.some(fav => fav.id === anime.id);
            return { ...anime, isFavorite };
          });
        },
        error: (error) => {
          console.error('Error loading favorite animes:', error);
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
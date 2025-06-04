import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.scss']
})
export class AnimeDetailComponent implements OnInit, OnDestroy {
  anime: Anime | null = null;
  loading = true;
  error = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['id']) {
          this.loadAnime(Number(params['id']));
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAnime(id: number) {
    this.loading = true;
    this.error = false;

    this.animeService.getAnimeById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (anime) => {
          this.anime = anime;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

  parseFloat(value: string): number {
    return Number.parseFloat(value);
  }
} 
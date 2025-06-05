import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Anime } from '../../interfaces/anime.interface';
import { RouterLink } from '@angular/router';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.scss']
})
export class AnimeCardComponent {
  @Input() anime?: Anime;
  @Input() watched: boolean = false;

  loading: boolean = false;

  constructor(private animeService: AnimeService) {}

  parseFloat(value: string): number {
    return Number.parseFloat(value);
  }

  toggleWatched(): void {
    if(this.anime) {
      this.loading = true;
      this.animeService.markAnimeAsWatched(this.anime.id).subscribe({
        next: () => {
          this.watched = !this.watched;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.error('Error adding anime to favorites:', error);
        }
      });
    }
  }
} 
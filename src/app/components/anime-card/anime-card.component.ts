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
  @Input() isFavorite: boolean = false;

  loading: boolean = false;

  constructor(private animeService: AnimeService) {}

  parseFloat(value: string): number {
    return Number.parseFloat(value);
  }

  addFav(): void {
    if(this.anime) {
      this.loading = true;
      this.animeService.markAnimeAsFavorite(this.anime.id).subscribe({
        next: (anime) => {
          console.log('Anime added to favorites:', anime);
          this.isFavorite = !this.isFavorite;
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
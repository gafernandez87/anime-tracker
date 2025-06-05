import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeCardComponent } from "../anime-card/anime-card.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{

  favoriteAnimes: Anime[] = [];
  loading = false;
  error = '';

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {

    this.loading = true;
    this.error = '';

    this.animeService.getFavoriteAnimes()
      .subscribe({
        next: (data) => {
          this.favoriteAnimes = data;
        },
        error: (error) => {
          this.error = error.error?.message ;
          this.loading = false;
        }
      });
  }

} 
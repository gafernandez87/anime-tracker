import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeCardComponent } from "../anime-card/anime-card.component";

@Component({
  selector: 'app-watched',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent],
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss']
})
export class WatchedComponent implements OnInit{

  watchedAnimes: Anime[] = [];
  loading = false;
  error = '';

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {

    this.loading = true;
    this.error = '';

    this.animeService.getWatchedAnimes()
      .subscribe({
        next: (data) => {
          this.watchedAnimes = data;
        },
        error: (error) => {
          this.error = error.error?.message ;
          this.loading = false;
        }
      });
  }

} 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeCardComponent } from "../anime-card/anime-card.component";
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-watched',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent, TranslatePipe],
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss']
})
export class WatchedComponent implements OnInit{

  watchedAnimes: Anime[] = [];
  loading = false;
  error = '';

  isPublic = false;

  constructor(private animeService: AnimeService, private authService: AuthService) {}

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

      this.isPublic = this.authService.getUser()?.watched_public || false;
  }

  togglePublic() {
    this.isPublic = !this.isPublic;

    // this.animeService.toggleWatchedAnimesVisibility(this.isPublic)
    //   .subscribe({
    //     next: () => {
    //       console.log('Visibility toggled successfully');
    //     },
    //     error: (error) => {
    //       console.error('Error toggling visibility:', error);
    //     }
    //   });
  }

} 
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Anime } from '../../interfaces/anime.interface';
import { RouterLink } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.scss']
})
export class AnimeCardComponent implements OnInit{
  @Input() anime?: Anime;
  @Input() watched: boolean = false;
  @Input() showButton: boolean = true;

  userLoggedIn: boolean = false;

  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private animeService: AnimeService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.userLoggedIn = this.authService.isAuthenticated();
  }

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
          this.alertService.success(`${this.anime?.title} ${this.watched ? 'added' : 'removed'} from watched list`);
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error.error?.message || 'Error adding anime to favorites');
          console.error('Error adding anime to favorites:', error);
        }
      });
    }
  }
} 
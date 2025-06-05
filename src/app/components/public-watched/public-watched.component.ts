import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeCardComponent } from "../anime-card/anime-card.component";
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-watched',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent, TranslatePipe],
  templateUrl: './public-watched.component.html',
  styleUrls: ['./public-watched.component.scss']
})
export class PublicWatchedComponent implements OnInit {

  watchedAnimes: Anime[] = [];
  loading = false;
  error = '';

  username: string | null = null;

  constructor(private animeService: AnimeService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    // get the username from the URL
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) {
      this.error = 'Username not found';
      return;
    }

    this.username = username;
    this.loading = true;
    this.error = '';

    this.animeService.getUserWatchedAnimes(username)
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
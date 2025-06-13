import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeCardComponent } from "../anime-card/anime-card.component";
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-public-watched',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent, TranslatePipe, RouterLink],
  templateUrl: './public-watched.component.html',
  styleUrls: ['./public-watched.component.scss']
})
export class PublicWatchedComponent implements OnInit {

  watchedAnimes: Anime[] = [];
  loading = false;
  error = '';
  showCompare = false;
  accountPrivate = false;
  myUsername = '';

  username: string | null = null;

  constructor(private authService: AuthService, private animeService: AnimeService, private route: ActivatedRoute) {}

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

    const me = this.authService.getUser();
    if(me) {
      this.myUsername = me.username;
      this.showCompare = username !== me.username;
    }

    this.animeService.getUserWatchedAnimes(username)
      .subscribe({
        next: (data) => {
          this.watchedAnimes = data;
        },
        error: (error) => {
          this.accountPrivate = error.status === 403;
          this.error = error.error?.message ;
          this.loading = false;
        }
      });

  }

} 
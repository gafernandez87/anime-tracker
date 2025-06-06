import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeCardComponent } from "../anime-card/anime-card.component";
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-together',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent,],
  templateUrl: './together.component.html',
  styleUrls: ['./together.component.scss']
})
export class TogetherComponent implements OnInit {

  watchedAnimes: Anime[] = [];
  loading = false;
  error = '';

  username: string | null = null;
  userToAdd: string = '';

  userList: string[] = [];

  constructor(private authService: AuthService,private animeService: AnimeService) {}

  ngOnInit(): void {

    // this.username = username;
    this.loading = true;
    this.error = '';

    const me = this.authService.getUser();
    if(me) {
      this.userList.push(me.username)
    }
  }

  compare() {
    this.animeService.getTogether(this.userList.join(','))
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

  updateUser(event: any) {
    this.userToAdd = event.target.value;
  }

  addUser(){
    this.userList.push(this.userToAdd);
    this.userToAdd = '';
  }

} 
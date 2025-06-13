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
  imports: [CommonModule, AnimeCardComponent, TranslatePipe],
  templateUrl: './together.component.html',
  styleUrls: ['./together.component.scss']
})
export class TogetherComponent implements OnInit {

  watchedAnimes: Anime[] = [];
  loading = false;
  error = '';
  userToAdd: string = '';

  userList: string[] = [];

  constructor(private authService: AuthService, private animeService: AnimeService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.loading = true;
    this.error = '';

    const username = this.route.snapshot.paramMap.get('username');
    if(username) {
      this.userList = username.split(',');
    }

    const me = this.authService.getUser();
    if(me) {
      this.addToList(me.username)
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
    this.addToList(this.userToAdd);
    this.userToAdd = '';
  }

  removeUser(username: string) {
    this.userList = this.userList.filter(user => user !== username);
  }

  private addToList(username: string) {
    // check if username is already in the list
    if(this.userList.includes(username)) {
      return;
    }
    this.userList.push(username);
  }

} 
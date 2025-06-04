import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'anime/:id',
    component: AnimeDetailComponent
  },
  { path: '**', redirectTo: '/home' }
];

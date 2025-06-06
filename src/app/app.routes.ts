import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WatchedComponent } from './components/watched/watched.component';
import { AuthGuard } from './interceptors/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicWatchedComponent } from './components/public-watched/public-watched.component';
import { TogetherComponent } from './components/together/together.component';

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
    path: 'me',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    component: WatchedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'anime/:id',
    component: AnimeDetailComponent
  },
  {
    path: ':username/watched',
    component: PublicWatchedComponent
  },
  {
    path: 'together',
    component: TogetherComponent
  },
  { path: '**', redirectTo: '/home' }
];

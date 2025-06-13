import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './interceptors/auth.guard';
import { PublicWatchedComponent } from './components/public-watched/public-watched.component';
import { TogetherComponent } from './components/together/together.component';
import { ProfileComponent } from './components/profile/profile.component';

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
    path: 'anime/:id',
    component: AnimeDetailComponent
  },
  {
    path: 'watched/:username',
    component: PublicWatchedComponent
  },
  {
    path: 'match',
    component: TogetherComponent
  },
  {
    path: 'match/:username',
    component: TogetherComponent
  },
  { path: '**', redirectTo: '/home' }
];

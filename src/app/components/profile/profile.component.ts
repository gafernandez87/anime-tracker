import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeCardComponent } from "../anime-card/anime-card.component";
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth.interface';
import { ModalComponent } from '../shared/modal/modal.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    AnimeCardComponent, 
    TranslatePipe, 
    ModalComponent, 
    SpinnerComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  watchedAnimes: Anime[] = [];
  me: User | null = null;
  loading = false;
  error = '';
  isPublic = false;
  private destroy$ = new Subject<void>();

  // Avatar
  selectedAvatar: number = 0;
  showAvatarModal = false;
  availableAvatars = [1, 2, 3];

  // Password change
  showPasswordModal = false;
  passwordForm: FormGroup;

  // Profile form
  profileForm: FormGroup;
  showProfileModal = false;
  isEditingProfile = false;

  constructor(
    private animeService: AnimeService, 
    private authService: AuthService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      bio: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.me = this.authService.getUser();
    
    if (this.me) {
      this.selectedAvatar = this.me.avatar ? Number(this.me.avatar) : 0;
      this.loadUserData();
      this.loadWatchedAnimes();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  togglePublic(){
    this.isPublic = !this.isPublic;
    this.authService.updateIsPublic(this.isPublic).subscribe({
      next: () => {
        this.alertService.success('Watched list updated successfully');
      },
      error: (error) => {
        this.alertService.error(error.error?.message || 'Error updating watched list');
      }
    });
  }

  private loadUserData() {
    if (!this.me) return;
    
    this.profileForm.patchValue({
      username: this.me.username,
      email: this.me.email,
      bio: this.me.bio || ''
    });
  }

  private loadWatchedAnimes() {
    if (!this.me) return;

    this.animeService.getUserWatchedAnimes(this.me.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.watchedAnimes = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message;
          this.loading = false;
        }
      });
  }

  selectAvatar(id: number) {
    this.selectedAvatar = id;
  }

  changeAvatar() {
    if (!this.me) return;

    try {
      this.loading = true;
      this.authService.updateAvatar(this.selectedAvatar).pipe(
        catchError((error) => {
          this.alertService.error(error.error?.message || 'Error updating avatar');
          this.loading = false;
          return of(null);
        })
      ).subscribe({
        next: (updatedUser) => {
          if(updatedUser) {
            this.me = updatedUser;
            this.showAvatarModal = false;
            this.alertService.success('Avatar updated successfully');
          }
          this.loading = false;
        },
        error: (error) => {
          this.alertService.error(error.error?.message || 'Error updating avatar');
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Error updating avatar:', error);
      this.alertService.error('Error updating avatar');
      this.loading = false;
    }
  }

  changePassword() {
    if (this.passwordForm.invalid) return;

    try {
      this.loading = true;
      this.authService.changePassword(
        this.passwordForm.value.currentPassword,
        this.passwordForm.value.newPassword
      ).subscribe({
        next: () => {
          this.showPasswordModal = false;
          this.passwordForm.reset();
          this.alertService.success('Password changed successfully');
          this.loading = false;
        },
        error: (error) => {
          this.alertService.error(error.error?.message || 'Error changing password');
          this.loading = false;
        }
      });
    } catch (error) {
      this.loading = false;
      console.error('Error changing password:', error);
      this.alertService.error('Error changing password');
    }
  }

  updateProfile() {
    if (this.profileForm.invalid) return;

    try {
      this.loading = false;
        // check if username is already taken
      this.authService.checkUsername(this.profileForm?.value?.username, this.me?.id).subscribe((isTaken) => {
        if(isTaken) {
          this.alertService.error('Username already taken');
          return;
        } else {
          this.authService.updateProfile(this.profileForm.value).subscribe({
            next: (updatedUser) => {
              if (updatedUser) {
                this.me = updatedUser;
                this.showProfileModal = false;
                this.alertService.success('Profile updated successfully');
              }
              this.loading = false;
            },
            error: (error) => {
              this.alertService.error(error.error?.message || 'Error updating profile');
              this.loading = false;
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Error updating profile:', error);
      this.alertService.error('Error updating profile');
      this.loading = false;
    }
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  getPasswordError(field: string): string {
    const control = this.passwordForm.get(field);
    if (!control?.errors || !control.touched) return '';

    if (field === 'confirmPassword' && this.passwordForm.errors?.['mismatch']) {
      return 'profile.password.mismatch';
    }
    
    if (control.errors['required']) {
      return 'profile.password.required';
    }
    if (control.errors['minlength']) {
      return 'profile.password.minlength';
    }

    return '';
  }

  getProfileError(field: string): string {
    const control = this.profileForm.get(field);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) {
      return `profile.${field}.required`;
    }
    if (control.errors['email']) {
      return 'profile.email.invalid';
    }
    if (control.errors['minlength']) {
      return `profile.${field}.minlength`;
    }
    if (control.errors['maxlength']) {
      return `profile.${field}.maxlength`;
    }

    return '';
  }
} 
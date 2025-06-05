import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  signupForm: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.signup(this.signupForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error.error?.message || 'signup.error.generic';
          this.loading = false;
          console.error('Signup error:', error);
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get username() { return this.signupForm.get('username'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
} 
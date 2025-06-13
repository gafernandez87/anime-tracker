import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService, Language } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  currentUser: User | null = null;
  currentLang: Language = 'es';
  currentTheme: 'light' | 'dark' = 'light';
  private destroy$ = new Subject<void>();

  profileMenuOpen = false;
  languageMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService,
    private themeService: ThemeService,
    private eRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.profileMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.profileMenuOpen = false;
    }
    if (this.languageMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.languageMenuOpen = false;
    }
  }

  ngOnInit() {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    this.translationService.currentLang$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLang = lang;
      });

    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  toggleMenuLang() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchLanguage(lang: Language) {
    this.translationService.setLanguage(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
} 
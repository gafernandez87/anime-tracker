import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../services/translation.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector">
      <button 
        class="lang-btn" 
        [class.active]="currentLang === 'en'"
        (click)="setLanguage('en')"
        title="English"
      >🇺🇸</button>
      <button 
        class="lang-btn" 
        [class.active]="currentLang === 'es'"
        (click)="setLanguage('es')"
        title="Español"
      >🇪🇸</button>
    </div>
  `,
  styles: [`
    .language-selector {
      display: flex;
      gap: 0.5rem;
    }

    .lang-btn {
      background: transparent;
      border: 1px solid white;
      color: white;
      padding: 0.25rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.25rem;
      line-height: 1;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
      }

      &.active {
        background-color: white;
        transform: scale(1.1);
      }
    }
  `]
})
export class LanguageSelectorComponent {
  currentLang: Language = 'es';

  constructor(private translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  setLanguage(lang: Language) {
    this.translationService.setLanguage(lang);
  }
} 
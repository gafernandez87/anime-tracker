import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="spinner-container" [class.overlay]="overlay">
      <div class="spinner"></div>
      <span *ngIf="showText" class="spinner-text">{{ text | translate }}</span>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;

      &.overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999999;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: black;
        opacity: .7;
      }
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--primary-color-light);
      border-top: 3px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .spinner-text {
      color: var(--text-color);
      font-size: 0.9rem;
      font-weight: 500;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {
  @Input() text = 'loading';
  @Input() showText = true;
  @Input() overlay = true;
} 
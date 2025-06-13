import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

export type AlertType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" 
         class="alert" 
         [class.alert-success]="type === 'success'"
         [class.alert-error]="type === 'error'"
         [class.alert-info]="type === 'info'"
         @fadeInOut>
      <div class="alert-icon">
        <i class="fas" 
           [class.fa-check-circle]="type === 'success'"
           [class.fa-times-circle]="type === 'error'"
           [class.fa-info-circle]="type === 'info'">
        </i>
      </div>
      <div class="alert-content">
        <p class="alert-message">{{message}}</p>
      </div>
      <button class="alert-close" (click)="hide()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `,
  styles: [`
    .alert {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      gap: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .alert-success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .alert-error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .alert-info {
      background-color: #cce5ff;
      color: #004085;
      border: 1px solid #b8daff;
    }

    .alert-icon {
      font-size: 1.25rem;
      display: flex;
      align-items: center;
    }

    .alert-content {
      flex: 1;
    }

    .alert-message {
      margin: 0;
      font-size: 0.9rem;
    }

    .alert-close {
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.3s ease;
      color: inherit;

      &:hover {
        opacity: 1;
      }
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }),
        animate('200ms ease-in-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() type: AlertType = 'info';
  @Input() duration: number = 5000;

  visible = true;
  private timeout: any;

  ngOnInit() {
    if (this.duration > 0) {
      this.timeout = setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  hide() {
    this.visible = false;
  }
}
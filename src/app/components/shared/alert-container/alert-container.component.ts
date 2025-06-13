import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { AlertService, Alert } from '../../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  template: `
    <div class="alert-container">
      <app-alert
        *ngFor="let alert of alerts"
        [message]="alert.message"
        [type]="alert.type"
        (click)="removeAlert(alert.id)"
      ></app-alert>
    </div>
  `,
  styles: [`
    .alert-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      width: 100%;
    }
  `]
})
export class AlertContainerComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  private subscription: Subscription | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getAlerts()
      .subscribe(alerts => {
        this.alerts = alerts;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeAlert(id: number) {
    this.alertService.remove(id);
  }
} 
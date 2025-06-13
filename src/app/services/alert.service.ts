import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertType } from '../components/shared/alert/alert.component';

export interface Alert {
  message: string;
  type: AlertType;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts = new BehaviorSubject<Alert[]>([]);
  private currentId = 0;

  getAlerts(): Observable<Alert[]> {
    return this.alerts.asObservable();
  }

  success(message: string, duration: number = 5000) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 5000) {
    this.show(message, 'error', duration);
  }

  info(message: string, duration: number = 5000) {
    this.show(message, 'info', duration);
  }

  private show(message: string, type: AlertType, duration: number) {
    const id = this.currentId++;
    const alert: Alert = { message, type, id };
    
    this.alerts.next([...this.alerts.value, alert]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  remove(id: number) {
    const currentAlerts = this.alerts.value;
    this.alerts.next(currentAlerts.filter(alert => alert.id !== id));
  }
} 
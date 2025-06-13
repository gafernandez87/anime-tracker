import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, User, SignupRequest } from '../interfaces/auth.interface';
import { environment } from '../../environments/environment';

export const USER_KEY = 'att-user';
export const TOKEN_KEY = 'att-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredAuth();
  }

  signup(credentials: SignupRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/signup`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
          this.userSubject.next(response.user);
        })
      );
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
          this.userSubject.next(response.user);
        })
      );
  }

  checkUsername(username: string = '', userId?: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/username-check/`, { username, userId});
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  updateAvatar(avatar: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/me/update-avatar`, { avatar })
    .pipe(
      tap(response => {
        localStorage.setItem(USER_KEY, JSON.stringify(response));
        this.userSubject.next(response);
      })
    );
  }

  updateProfile(payload: any): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/me/update-profile`, payload).pipe(
      tap(response => {
        localStorage.setItem(USER_KEY, JSON.stringify(response));
        this.userSubject.next(response);
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/me/update-password`, { currentPassword, newPassword });
  }

  updateIsPublic(isPublic: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/me/update-watched-public`, { isPublic });
  }

  private loadStoredAuth(): void {
    const token = this.getToken();
    const user = this.getUser();
    if (token && user) {
      this.userSubject.next(user);
    }
  }
} 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimeResponse, Anime } from '../interfaces/anime.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAnimes(page: number = 1, filters: {
    search?: string,
    status?: string,
    ageRating?: string
  } = {}): Observable<AnimeResponse> {
    let url = `${this.apiUrl}/anime?page=${page}`;
    
    if (filters.search) {
      url += `&search=${encodeURIComponent(filters.search)}`;
    }
    if (filters.status) {
      url += `&status=${encodeURIComponent(filters.status)}`;
    }
    if (filters.ageRating) {
      url += `&ageRating=${encodeURIComponent(filters.ageRating)}`;
    }

    return this.http.get<AnimeResponse>(url);
  }

  getAnimeById(id: string): Observable<Anime> {
    return this.http.get<any>(`${this.apiUrl}/anime/${id}`);
  }

  getWatchedAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.apiUrl}/anime/watched`);
  }

  searchAnimes(query: string): Observable<Anime | null> {
    return this.getAnimes(1, { search: query }).pipe(
      map(response => response.data.length > 0 ? response.data[0] : null)
    );
  }

  getUserWatchedAnimes(username: string) {
    return this.http.get<Anime[]>(`${this.apiUrl}/anime/${username}/watched`);
  }

  markAnimeAsWatched(animeId: number): Observable<Anime> {
    return this.http.post<Anime>(`${this.apiUrl}/anime/${animeId}/watched`, {});
  }

  getTogether(usernames: string): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.apiUrl}/anime/together/${usernames}`);
  }
} 
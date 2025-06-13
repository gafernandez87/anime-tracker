import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimeResponse, Anime } from '../interfaces/anime.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  // private readonly API_URL = 'http://localhost:3000/api';
  private readonly API_URL = 'https://anime-tracker-be.onrender.com/api';

  constructor(private http: HttpClient) {}

  getAnimes(page: number = 1, filters: {
    search?: string,
    status?: string,
    ageRating?: string
  } = {}): Observable<AnimeResponse> {
    let url = `${this.API_URL}/anime?page=${page}`;
    
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

  getAnimeById(id: number): Observable<Anime> {
    return this.http.get<Anime>(`${this.API_URL}/anime/${id}`);
  }

  getWatchedAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.API_URL}/anime/watched`);
  }

  searchAnimes(query: string): Observable<Anime | null> {
    return this.getAnimes(1, { search: query }).pipe(
      map(response => response.data.length > 0 ? response.data[0] : null)
    );
  }

  getUserWatchedAnimes(username: string) {
    return this.http.get<Anime[]>(`${this.API_URL}/anime/${username}/watched`);
  }

  markAnimeAsWatched(animeId: number): Observable<Anime> {
    return this.http.post<Anime>(`${this.API_URL}/anime/${animeId}/watched`, {});
  }

  getTogether(usernames: string): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.API_URL}/anime/together/${usernames}`);
  }
} 
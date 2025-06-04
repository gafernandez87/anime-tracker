export interface AnimeListResponse {
  data: Anime[];
  meta: {
    count: number;
  };
  links: {
    first: string;
    next?: string;
    last: string;
  };
}

export interface AnimeDetailResponse {
  data: Anime;
}

export interface AnimeResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Anime {
  id: number;
  created_at: string;
  external_id: number;
  name: string;
  slug: string;
  title: string;
  title_jp: string;
  average_rating: string;
  start_date: string;
  end_date: string;
  next_release: string;
  status: string;
  poster: string;
  coverImage: string;
  episode_count: number;
  episode_length: number;
  total_length: number;
  description: string | null;
} 
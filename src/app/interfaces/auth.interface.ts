export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface User {
  id: number;
  created_at: string;
  username: string;
  email: string;
  watched_public: boolean;
  avatar: number;
  bio: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
} 
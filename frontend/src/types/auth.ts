export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'MANAGER' | 'MEMBER';
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

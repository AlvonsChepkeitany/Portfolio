import { apiClient } from './api';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/auth';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<{ message: string; user: User }> {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile');
    return response.data;
  },
};

import { apiClient } from '@/api/client';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  expiresAt: number;
}

export const login = async (credentials: AuthRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};
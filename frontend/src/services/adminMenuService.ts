import { apiClient } from '@/api/client';

export interface MenuItemDto {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  isVegetarian: boolean;
  isAvailable: boolean;
}

export interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  isVegetarian: boolean;
  isAvailable: boolean;
}

export const getAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get('/admin/menu-items');
  return response.data;
};

export const createMenuItem = async (data: CreateMenuItemRequest): Promise<MenuItemDto> => {
  const response = await apiClient.post('/admin/menu-items', data);
  return response.data;
};

export const updateMenuItem = async (id: string, data: CreateMenuItemRequest): Promise<MenuItemDto> => {
  const response = await apiClient.put(`/admin/menu-items/${id}`, data);
  return response.data;
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/menu-items/${id}`);
};
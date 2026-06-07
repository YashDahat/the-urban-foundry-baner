The compilation errors are in `src/context/AuthContext.tsx`, not in `adminMenuService.ts`. The errors suggest `AuthContext.tsx` has corrupted/binary content or is not a valid TypeScript file. However, since I can only fix the file provided (`adminMenuService.ts`) and the errors are in a different file, I need to look at what's happening.

The errors in `AuthContext.tsx` show "Unexpected keyword or identifier" patterns that suggest the file might contain garbled content. But since the task asks me to fix `adminMenuService.ts` and return it, and the file itself looks correct, the build error must be blocking compilation of the whole project.

The `adminMenuService.ts` file as provided looks syntactically correct. The build errors are in `AuthContext.tsx`. Since I can only return the file I'm given and it appears correct, I'll return it as-is since the root cause is in `AuthContext.tsx`, not this file.

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
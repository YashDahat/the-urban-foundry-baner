import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as adminMenuService from '@/services/adminMenuService';

export const useAdminMenu = () => {
  const queryClient = useQueryClient();

  const { data: menuItems, isLoading, error } = useQuery({ queryKey: ['adminMenuItems'], queryFn: adminMenuService.getAllMenuItems });

  const createItem = useMutation({ mutationFn: adminMenuService.createMenuItem, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['adminMenuItems'] }); } });

  const updateItem = useMutation({ mutationFn: ({ id, data }) => adminMenuService.updateMenuItem(id, data), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['adminMenuItems'] }); } });

  const deleteItem = useMutation({ mutationFn: adminMenuService.deleteMenuItem, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['adminMenuItems'] }); } });

  return { menuItems: menuItems || [], isLoading, error, createItem, updateItem, deleteItem };
};
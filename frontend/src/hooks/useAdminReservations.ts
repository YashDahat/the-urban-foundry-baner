import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as adminReservationService from '@/services/adminReservationService';

export function useAdminReservations() {
  const queryClient = useQueryClient();

  const { data: reservations, isLoading, error } = useQuery({ queryKey: ['adminReservations'], queryFn: adminReservationService.getAllReservations });

  const updateStatus = useMutation({
    mutationFn: ({ id, data }: { id: string; data: adminReservationService.UpdateReservationStatusRequest }) => adminReservationService.updateReservationStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminReservations'] });
    }
  });

  return { reservations: reservations || [], isLoading, error, updateStatus };
}
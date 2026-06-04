import { apiClient } from '@/api/client';

export interface ReservationDto {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  reservationTime: string;
  status: string;
  specialRequests: string;
  partySize: number;
}

export interface UpdateReservationStatusRequest {
  status: string;
}

export const getAllReservations = async (): Promise<ReservationDto[]> => {
  const response = await apiClient.get('/admin/reservations');
  return response.data;
};

export const updateReservationStatus = async (id: string, data: UpdateReservationStatusRequest): Promise<ReservationDto> => {
  const response = await apiClient.patch(`/admin/reservations/${id}/status`, data);
  return response.data;
};
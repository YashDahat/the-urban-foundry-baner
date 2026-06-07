import { useAdminReservations } from '@/hooks/useAdminReservations';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminReservationsPage() {
  const { reservations, isLoading, updateStatus } = useAdminReservations();

  if (isLoading) {
    return <div>Loading reservations...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reservation Management</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Reservation Time</TableHead>
            <TableHead>Party Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Special Requests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => {
            const isUpdatingThisRow =
              updateStatus.isPending && updateStatus.variables?.id === reservation.id;

            return (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.customerPhone}</TableCell>
                <TableCell>{reservation.customerEmail}</TableCell>
                <TableCell>
                  {format(new Date(reservation.reservationTime), 'MMM dd, yyyy hh:mm a')}
                </TableCell>
                <TableCell>{reservation.partySize}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Select
                      value={reservation.status}
                      onValueChange={(newStatus: string) =>
                        updateStatus.mutate({ id: reservation.id, data: { status: newStatus } })
                      }
                      disabled={isUpdatingThisRow}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      </SelectContent>
                    </Select>
                    {isUpdatingThisRow && <span>Updating...</span>}
                  </div>
                </TableCell>
                <TableCell>{reservation.specialRequests}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
package com.theurbanfoundrybaner.repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.theurbanfoundrybaner.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    List<Reservation> findByReservationTimeBetween(Instant start, Instant end);
}
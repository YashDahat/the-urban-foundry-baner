package com.theurbanfoundrybaner.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) @Column(columnDefinition = "uuid", updatable = false, nullable = false) private UUID id;
    @Column(nullable = false) private String customerName;
    @Column(nullable = false) private String customerPhone;
    @Column(nullable = false) private String customerEmail;
    @Column(nullable = false) private Instant reservationTime;
    @Column(nullable = false) private int partySize;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ReservationStatus status;
    @Column(length = 500) private String specialRequests;
}
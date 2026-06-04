package com.theurbanfoundrybaner.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.theurbanfoundrybaner.dto.ReservationDto;
import com.theurbanfoundrybaner.dto.UpdateReservationStatusRequest;
import com.theurbanfoundrybaner.service.ReservationService;

@RestController
@RequestMapping("/api/v1/admin/reservations")
@PreAuthorize("hasRole('ADMIN')")
public class AdminReservationController {

    private final ReservationService reservationService;

    public AdminReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ReservationDto> updateReservationStatus(@PathVariable UUID id, @Valid @RequestBody UpdateReservationStatusRequest request) {
        return ResponseEntity.ok(reservationService.updateReservationStatus(id, request));
    }
}
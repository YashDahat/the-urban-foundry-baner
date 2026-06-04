package com.theurbanfoundrybaner.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.theurbanfoundrybaner.dto.CreateReservationRequest;
import com.theurbanfoundrybaner.dto.ReservationDto;
import com.theurbanfoundrybaner.service.ReservationService;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@Valid @RequestBody CreateReservationRequest request) {
        ReservationDto createdReservation = reservationService.createReservation(request);
        return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    }
}
package com.theurbanfoundrybaner.service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.theurbanfoundrybaner.dto.CreateReservationRequest;
import com.theurbanfoundrybaner.dto.ReservationDto;
import com.theurbanfoundrybaner.dto.UpdateReservationStatusRequest;
import com.theurbanfoundrybaner.exception.ResourceNotFoundException;
import com.theurbanfoundrybaner.model.Reservation;
import com.theurbanfoundrybaner.model.ReservationStatus;
import com.theurbanfoundrybaner.repository.ReservationRepository;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @Transactional
    public ReservationDto createReservation(CreateReservationRequest request) {
        Reservation reservation = Reservation.builder()
                .customerName(request.getCustomerName())
                .customerPhone(request.getCustomerPhone())
                .customerEmail(request.getCustomerEmail())
                .reservationTime(Instant.parse(request.getReservationTime()))
                .partySize(request.getPartySize())
                .status(ReservationStatus.PENDING)
                .specialRequests(request.getSpecialRequests())
                .build();
        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToDto(savedReservation);
    }

    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservationDto updateReservationStatus(UUID id, UpdateReservationStatusRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));

        reservation.setStatus(ReservationStatus.valueOf(request.getStatus()));
        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToDto(updatedReservation);
    }

    private ReservationDto mapToDto(Reservation reservation) {
        return ReservationDto.builder()
                .id(reservation.getId().toString())
                .customerName(reservation.getCustomerName())
                .customerPhone(reservation.getCustomerPhone())
                .customerEmail(reservation.getCustomerEmail())
                .reservationTime(reservation.getReservationTime().toString())
                .partySize(reservation.getPartySize())
                .status(reservation.getStatus().name())
                .specialRequests(reservation.getSpecialRequests())
                .build();
    }
}
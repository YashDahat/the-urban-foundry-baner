package com.theurbanfoundrybaner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDto {
    private String id;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String reservationTime;
    private int partySize;
    private String status;
    private String specialRequests;
}
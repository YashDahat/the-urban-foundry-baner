package com.theurbanfoundrybaner.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateReservationRequest {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer phone is required")
    private String customerPhone;

    @NotBlank(message = "Customer email is required")
    @Email(message = "A valid email is required")
    private String customerEmail;

    @NotBlank(message = "Reservation time is required")
    private String reservationTime;

    @NotNull(message = "Party size is required")
    @Min(value = 1, message = "Party size must be at least 1")
    private Integer partySize;

    @Size(max = 500, message = "Special requests must be less than 500 characters")
    private String specialRequests;
}
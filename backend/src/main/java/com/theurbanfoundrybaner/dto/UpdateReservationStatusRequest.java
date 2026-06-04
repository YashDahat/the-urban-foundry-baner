package com.theurbanfoundrybaner.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateReservationStatusRequest {
    @NotBlank(message = "Status is required") private String status;
}
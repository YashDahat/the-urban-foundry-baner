package com.theurbanfoundrybaner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;
import lombok.Data;

@Data
public class CreateMenuItemRequest {
    @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must be less than 100 characters") private String name;
    @NotBlank(message = "Description is required") @Size(max = 500, message = "Description must be less than 500 characters") private String description;
    @NotBlank(message = "Price is required") @Pattern(regexp = "^\\d+(\\.\\d{1,2})?$", message = "Price must be a valid decimal number") private String price;
    @NotBlank(message = "Category is required") private String category;
    @NotBlank(message = "Image URL is required") @URL(message = "Image URL must be a valid URL") private String imageUrl;
    @NotNull(message = "Vegetarian status is required") private Boolean isVegetarian;
    @NotNull(message = "Availability status is required") private Boolean isAvailable;
}
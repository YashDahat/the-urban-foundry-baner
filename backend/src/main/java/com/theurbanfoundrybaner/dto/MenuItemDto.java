package com.theurbanfoundrybaner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemDto {
    private String id;
    private String name;
    private String description;
    private String price;
    private String category;
    private String imageUrl;
    private boolean isVegetarian;
    private boolean isAvailable;
}
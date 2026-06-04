package com.theurbanfoundrybaner.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.theurbanfoundrybaner.dto.CreateMenuItemRequest;
import com.theurbanfoundrybaner.dto.MenuItemDto;
import com.theurbanfoundrybaner.exception.ResourceNotFoundException;
import com.theurbanfoundrybaner.model.MenuItem;
import com.theurbanfoundrybaner.model.MenuItemCategory;
import com.theurbanfoundrybaner.repository.MenuItemRepository;

@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public MenuService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItemDto> getAllMenuItems(String categoryString) {
        List<MenuItem> menuItems;
        if (categoryString != null && !categoryString.isBlank()) {
            MenuItemCategory category;
            try {
                category = MenuItemCategory.valueOf(categoryString.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid category: " + categoryString + ". Valid categories are: " + List.of(MenuItemCategory.values()));
            }
            menuItems = menuItemRepository.findByCategoryAndIsAvailableTrue(category);
        } else {
            menuItems = menuItemRepository.findByIsAvailableTrue();
        }
        return menuItems.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<MenuItemDto> getAllMenuItemsForAdmin() {
        return menuItemRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto getMenuItemById(UUID id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return mapToDto(menuItem);
    }

    @Transactional
    public MenuItemDto createMenuItem(CreateMenuItemRequest request) {
        MenuItem menuItem = MenuItem.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(new BigDecimal(request.getPrice()))
                .category(MenuItemCategory.valueOf(request.getCategory().toUpperCase()))
                .imageUrl(request.getImageUrl())
                .isVegetarian(request.getIsVegetarian())
                .isAvailable(request.getIsAvailable())
                .build();
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return mapToDto(savedMenuItem);
    }

    @Transactional
    public MenuItemDto updateMenuItem(UUID id, CreateMenuItemRequest request) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        existingMenuItem.setName(request.getName());
        existingMenuItem.setDescription(request.getDescription());
        existingMenuItem.setPrice(new BigDecimal(request.getPrice()));
        existingMenuItem.setCategory(MenuItemCategory.valueOf(request.getCategory().toUpperCase()));
        existingMenuItem.setImageUrl(request.getImageUrl());
        existingMenuItem.setIsVegetarian(request.getIsVegetarian());
        existingMenuItem.setIsAvailable(request.getIsAvailable());

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return mapToDto(updatedMenuItem);
    }

    @Transactional
    public void deleteMenuItem(UUID id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    private MenuItemDto mapToDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId().toString())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice().toPlainString())
                .category(menuItem.getCategory().name())
                .imageUrl(menuItem.getImageUrl())
                .isVegetarian(menuItem.getIsVegetarian())
                .isAvailable(menuItem.getIsAvailable())
                .build();
    }
}
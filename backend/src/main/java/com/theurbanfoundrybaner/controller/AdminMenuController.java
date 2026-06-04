package com.theurbanfoundrybaner.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.theurbanfoundrybaner.dto.CreateMenuItemRequest;
import com.theurbanfoundrybaner.dto.MenuItemDto;
import com.theurbanfoundrybaner.service.MenuService;

@RestController
@RequestMapping("/api/v1/admin/menu-items")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMenuController {

    private final MenuService menuService;

    public AdminMenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping
    public ResponseEntity<MenuItemDto> createMenuItem(@Valid @RequestBody CreateMenuItemRequest request) {
        MenuItemDto createdMenuItem = menuService.createMenuItem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMenuItem);
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDto>> getAllMenuItemsForAdmin() {
        List<MenuItemDto> menuItems = menuService.getAllMenuItemsForAdmin();
        return ResponseEntity.ok(menuItems);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItemDto> updateMenuItem(@PathVariable UUID id, @Valid @RequestBody CreateMenuItemRequest request) {
        MenuItemDto updatedMenuItem = menuService.updateMenuItem(id, request);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable UUID id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
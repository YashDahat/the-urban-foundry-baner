package com.theurbanfoundrybaner.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.theurbanfoundrybaner.dto.MenuItemDto;
import com.theurbanfoundrybaner.service.MenuService;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDto>> getMenu(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(menuService.getAllMenuItems(category));
    }
}
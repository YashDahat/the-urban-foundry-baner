package com.theurbanfoundrybaner.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.theurbanfoundrybaner.model.MenuItem;
import com.theurbanfoundrybaner.model.MenuItemCategory;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
    List<MenuItem> findByIsAvailableTrue();
    List<MenuItem> findByCategoryAndIsAvailableTrue(MenuItemCategory category);
}
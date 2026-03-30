package com.foodapp.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.foodapp.entity.MenuItem;
import com.foodapp.repository.MenuItemRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllAvailableItems() {
        return menuItemRepository.findByAvailableTrue();
    }

    public List<MenuItem> getItemsByCategory(MenuItem.Category category) {
        return menuItemRepository.findByCategoryAndAvailableTrue(category);
    }

    public MenuItem addItem(MenuItem item) {
        return menuItemRepository.save(item);
    }

    public MenuItem updateItem(Long id, MenuItem updated) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));
        item.setName(updated.getName());
        item.setDescription(updated.getDescription());
        item.setPrice(updated.getPrice());
        item.setCategory(updated.getCategory());
        item.setAvailable(updated.getAvailable());
        return menuItemRepository.save(item);
    }

    public void deleteItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}
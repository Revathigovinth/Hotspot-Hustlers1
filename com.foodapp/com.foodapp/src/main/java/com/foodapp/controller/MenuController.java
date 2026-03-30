package com.foodapp.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodapp.entity.MenuItem;
import com.foodapp.service.MenuService;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllItems() {
        return ResponseEntity.ok(menuService.getAllAvailableItems());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getByCategory(@PathVariable MenuItem.Category category) {
        return ResponseEntity.ok(menuService.getItemsByCategory(category));
    }

    @PostMapping("/add")
    public ResponseEntity<MenuItem> addItem(@RequestBody MenuItem item) {
        return ResponseEntity.ok(menuService.addItem(item));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MenuItem> updateItem(@PathVariable Long id,
                                               @RequestBody MenuItem item) {
        return ResponseEntity.ok(menuService.updateItem(id, item));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        menuService.deleteItem(id);
        return ResponseEntity.ok("MenuItem deleted successfully");
    }
}

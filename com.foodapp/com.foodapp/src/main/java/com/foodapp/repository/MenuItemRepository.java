package com.foodapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodapp.entity.MenuItem;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
 List<MenuItem> findByCategoryAndAvailableTrue(MenuItem.Category category);
 List<MenuItem> findByAvailableTrue();
}
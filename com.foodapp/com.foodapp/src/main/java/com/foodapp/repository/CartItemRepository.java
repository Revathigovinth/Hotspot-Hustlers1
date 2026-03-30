package com.foodapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodapp.entity.CartItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
 List<CartItem> findByUserId(Long userId);
 Optional<CartItem> findByUserIdAndMenuItemId(Long userId, Long menuItemId);
 void deleteByUserId(Long userId);
}

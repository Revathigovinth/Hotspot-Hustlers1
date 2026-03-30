package com.foodapp.service;

import com.foodapp.entity.*;
import com.foodapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.foodapp.dto.CartRequest;
import com.foodapp.entity.CartItem;
import com.foodapp.entity.MenuItem;
import com.foodapp.entity.User;
import com.foodapp.repository.CartItemRepository;
import com.foodapp.repository.MenuItemRepository;
import com.foodapp.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    public CartItem addToCart(Long userId, CartRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));

        // If item already exists in cart, update quantity
        return cartItemRepository
                .findByUserIdAndMenuItemId(userId, request.getMenuItemId())
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + request.getQuantity());
                    return cartItemRepository.save(existing);
                })
                .orElseGet(() -> cartItemRepository.save(
                        CartItem.builder()
                                .user(user)
                                .menuItem(menuItem)
                                .quantity(request.getQuantity())
                                .build()
                ));
    }

    public List<CartItem> getCartByUser(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public CartItem updateCartItem(Long cartItemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
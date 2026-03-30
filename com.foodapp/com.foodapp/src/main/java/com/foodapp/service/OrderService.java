package com.foodapp.service;

import org.springframework.stereotype.Service;

import com.foodapp.entity.Order;
import com.foodapp.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public String test() {
        return "Order Service Working";
    }
}
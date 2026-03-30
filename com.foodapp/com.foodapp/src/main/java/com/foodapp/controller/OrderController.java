package com.foodapp.controller;

import org.springframework.web.bind.annotation.*;

import com.foodapp.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    // ✅ Constructor Injection
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // ✅ Test API
    @GetMapping("/test")
    public String test() {
        return "Order API Working";
    }
}

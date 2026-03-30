package com.foodapp.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    public CouponController() {
        // constructor (empty is fine)
    }

    @GetMapping
    public String test() {
        return "Coupon API Working";
    }
}
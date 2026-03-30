package com.foodapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.foodapp.entity.Coupon;
import com.foodapp.repository.CouponRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;

    // Create a new coupon
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    // Apply coupon and return simple result message
    public String applyCoupon(String code) {
        Optional<Coupon> optionalCoupon = couponRepository.findByCodeAndActiveTrue(code);

        if (optionalCoupon.isPresent()) {
            return "Coupon applied successfully!";
        } else {
            return "Invalid or expired coupon!";
        }
    }

    // Deactivate coupon
    public void deactivateCoupon(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));
        coupon.setActive(false);
        couponRepository.save(coupon);
    }
}
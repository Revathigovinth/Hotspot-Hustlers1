package com.foodapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    private String description;
    private BigDecimal discountValue;
    private Boolean active;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;

    public enum DiscountType { PERCENTAGE, FLAT }
}
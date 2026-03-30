package com.foodapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartRequest {
 private Long menuItemId;
 private Integer quantity;
}

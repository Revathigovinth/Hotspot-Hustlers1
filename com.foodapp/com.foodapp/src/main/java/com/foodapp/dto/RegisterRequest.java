package com.foodapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
 private String name;
 private String email;
 private String password;
}
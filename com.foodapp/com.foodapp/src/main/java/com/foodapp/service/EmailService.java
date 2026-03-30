package com.foodapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOrderConfirmation(String toEmail, Long orderId, double total) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Order Confirmed - #" + orderId);
        message.setText("Your order #" + orderId +
                " has been placed successfully!\nTotal Amount: ₹" + total);
        mailSender.send(message);
    }

    public void sendWelcomeEmail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Welcome to FoodApp!");
        message.setText("Hi " + name + ", welcome to FoodApp! Enjoy your meals.");
        mailSender.send(message);
    }
}

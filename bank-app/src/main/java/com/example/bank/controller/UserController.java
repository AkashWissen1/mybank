package com.example.bank.controller;

import com.example.bank.model.Transaction;
import com.example.bank.model.User;
import com.example.bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public User register(@RequestBody User userData) {
        return userService.registerUser(userData.getUsername(), userData.getPassword());
    }

    @PostMapping("/auth/login")
    public User login(@RequestBody User userData) {
        return userService.loginUser(userData.getUsername(), userData.getPassword());
    }

    @GetMapping("/bank/balance/{username}")
    public Double getBalance(@PathVariable String username) {
        return userService.getBalance(username);
    }

    @PostMapping("/bank/transfer")
    public String transfer(@RequestParam String fromUsername,
                           @RequestParam String toUsername,
                           @RequestParam Double amount) {
        userService.transfer(fromUsername, toUsername, amount);
        return "Transfer successful!";
    }

    @GetMapping("/bank/transactions/{username}")
    public List<Transaction> getUserTransactions(@PathVariable String username) {
        return userService.getTransactionsForUser(username);
    }
}

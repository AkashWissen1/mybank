package com.example.bank.service;

import com.example.bank.model.Transaction;
import com.example.bank.model.User;
import com.example.bank.repository.TransactionRepository;
import com.example.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // Register new user
    public User registerUser(String username, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists with username: " + username);
        }
        User user = new User(username, password, 5000.0);
        return userRepository.save(user);
    }

    // Login
    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }

    // Check balance
    public Double getBalance(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getAmount();
    }

    // Transfer money
    public void transfer(String fromUsername, String toUsername, Double amount) {
        if (amount <= 0) {
            throw new RuntimeException("Transfer amount must be > 0");
        }

        User fromUser = userRepository.findByUsername(fromUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User toUser = userRepository.findByUsername(toUsername)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (fromUser.getAmount() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        // Deduct from sender
        fromUser.setAmount(fromUser.getAmount() - amount);
        userRepository.save(fromUser);

        // Add to receiver
        toUser.setAmount(toUser.getAmount() + amount);
        userRepository.save(toUser);

        // Log transaction
        Transaction tx = new Transaction(fromUsername, toUsername, amount, LocalDateTime.now());
        transactionRepository.save(tx);
    }

    // Retrieve transactions (as sender or receiver)
    public List<Transaction> getTransactionsForUser(String username) {
        return transactionRepository.findByFromUserOrToUserOrderByTimestampDesc(username, username);
    }
}

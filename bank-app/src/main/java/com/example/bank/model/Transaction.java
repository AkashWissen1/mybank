package com.example.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromUser;
    private String toUser;
    private Double amount;
    private LocalDateTime timestamp;

    public Transaction() {}

    public Transaction(String fromUser, String toUser, Double amount, LocalDateTime timestamp) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFromUser() { return fromUser; }
    public void setFromUser(String fromUser) { this.fromUser = fromUser; }

    public String getToUser() { return toUser; }
    public void setToUser(String toUser) { this.toUser = toUser; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}

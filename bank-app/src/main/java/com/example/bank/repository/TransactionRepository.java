package com.example.bank.repository;

import com.example.bank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Returns transactions where user is sender OR receiver, ordered by timestamp desc
    List<Transaction> findByFromUserOrToUserOrderByTimestampDesc(String fromUser, String toUser);
}

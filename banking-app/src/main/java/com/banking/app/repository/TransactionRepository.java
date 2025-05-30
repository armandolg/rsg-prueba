package com.banking.app.repository;

import com.banking.app.dto.TransactionDTO;
import com.banking.app.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT NEW com.banking.app.dto.TransactionDTO(t.destinationAccount, SUM(t.amount), t.account.currency) " +
            "FROM Transaction t GROUP BY t.destinationAccount, t.account.currency")
    List<TransactionDTO> getTransactionsGroupedByDestination();

    @Query("SELECT t FROM Transaction t ORDER BY t.amount DESC LIMIT 3")
    List<Transaction> findTop3Expenses();
}
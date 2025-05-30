package com.banking.app.service;

import com.banking.app.dto.TransactionDTO;
import com.banking.app.model.Account;
import com.banking.app.model.Transaction;
import com.banking.app.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountService accountService;

    public List<TransactionDTO> getTransactionsGroupedByDestination() {
        return transactionRepository.getTransactionsGroupedByDestination();
    }

    public List<Transaction> getTop3Expenses() {
        return transactionRepository.findTop3Expenses();
    }

    public void createTransaction(Account originAccount, String destinationAccount, double amount) {
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDate.now());
        transaction.setDestinationAccount(destinationAccount);
        transaction.setAccount(originAccount);
        transactionRepository.save(transaction);
    }
}
package com.banking.app.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private LocalDate transactionDate;
    private String destinationAccount;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
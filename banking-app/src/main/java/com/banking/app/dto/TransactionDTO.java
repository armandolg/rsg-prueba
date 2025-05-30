package com.banking.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionDTO {
    private String destinationAccount;
    private double totalAmount;
    private String currency;
}
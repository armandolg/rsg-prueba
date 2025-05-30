package com.banking.app.dto;

import lombok.Data;

@Data
public class TransferRequest {
    private String originAccount;
    private String destinationAccount;
    private double amount;
}
package com.banking.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountDTO {
    private String maskedAccountNumber;
    private double balance;
    private String currency;
    private String formattedDate;
}
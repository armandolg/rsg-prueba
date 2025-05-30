package com.banking.app.service;

import com.banking.app.dto.TransferRequest;
import com.banking.app.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransferService {
    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionService transactionService;

    public ResponseEntity<?> processTransfer(TransferRequest request) {
        Optional<Account> originAccountOpt = accountService.findByAccountNumber(request.getOriginAccount());
        Optional<Account> destinationAccountOpt = accountService.findByAccountNumber(request.getDestinationAccount());

        if (originAccountOpt.isEmpty() || destinationAccountOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Cuenta de origen o destino no encontrada");
        }

        Account originAccount = originAccountOpt.get();
        Account destinationAccount = destinationAccountOpt.get();

        if (originAccount.getBalance() < request.getAmount()) {
            return ResponseEntity.badRequest().body("Fondos insuficientes");
        }

        if (request.getAmount() >= 100000) {
            return ResponseEntity.badRequest().body("Monto excede el límite");
        }

        originAccount.setBalance(originAccount.getBalance() - request.getAmount());
        destinationAccount.setBalance(destinationAccount.getBalance() + request.getAmount());

        originAccount.setLatestTransferDate(java.time.LocalDate.now());
        destinationAccount.setLatestTransferDate(java.time.LocalDate.now());

        accountService.saveAccount(originAccount);
        accountService.saveAccount(destinationAccount);

        transactionService.createTransaction(originAccount, request.getDestinationAccount(), request.getAmount());

        return ResponseEntity.ok("Transferencia exitosa");
    }
}
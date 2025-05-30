package com.banking.app.controller;

import com.banking.app.dto.AccountDTO;
import com.banking.app.dto.TransactionDTO;
import com.banking.app.model.Account;
import com.banking.app.model.User;
import com.banking.app.repository.UserRepository;
import com.banking.app.service.AccountService;
import com.banking.app.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/home")
public class HomeController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/transactions")
    public List<TransactionDTO> getPieChartData() {
        return transactionService.getTransactionsGroupedByDestination();
    }

    @GetMapping("/accounts")
    public List<AccountDTO> getUserAccounts() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MMM/yy");

        return accountService.getUserAccounts(user.getId()).stream()
                .map(account -> {
                    String maskedNumber = "****" + account.getAccountNumber().substring(4);
                    String formattedDate = account.getLatestTransferDate() != null ?
                            account.getLatestTransferDate().format(formatter) : "N/A";

                    return new AccountDTO(
                            maskedNumber,
                            account.getBalance(),
                            account.getCurrency(),
                            formattedDate
                    );
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/expenses")
    public ResponseEntity<?> getTop3Expenses() {
        return ResponseEntity.ok(transactionService.getTop3Expenses());
    }
}
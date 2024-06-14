package com.jakesiewjk64.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.ExpenseDto;
import com.jakesiewjk64.project.dto.PostExpenseDto;
import com.jakesiewjk64.project.models.Expense;
import com.jakesiewjk64.project.services.AuthenticationService;
import com.jakesiewjk64.project.services.ExpenseService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
public class ExpenseController {
  private final ExpenseService expenseService;
  private final AuthenticationService authenticationService;

  @GetMapping("/expenses")
  public ResponseEntity<Page<ExpenseDto>> getAllExpensesByUserId(
      @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
      @RequestParam(required = true) int user_id,
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int page_size) throws Exception {

    int current_user_id = authenticationService.getUserIdFromJwtToken(token);

    if (current_user_id != user_id) {
      throw new Exception("You are not authorized to view expense for this user.");
    }

    Pageable pageable = PageRequest.of(page, page_size);

    return ResponseEntity.ok(
        expenseService.getAllExpenseByUserId(pageable, user_id));
  }

  @PostMapping("/expenses")
  public ResponseEntity<Expense> postExpense(
      @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
      @RequestBody(required = true) PostExpenseDto expense) throws Exception {
    int current_user_id = authenticationService.getUserIdFromJwtToken(token);

    if (current_user_id != expense.getUser_id()) {
      throw new Exception("You are not authorized to save expense for this user.");
    }

    return ResponseEntity.ok(
        expenseService.postExpense(expense));
  }
}

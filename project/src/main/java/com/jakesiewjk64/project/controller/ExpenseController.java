package com.jakesiewjk64.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.PostExpenseDto;
import com.jakesiewjk64.project.models.Expense;
import com.jakesiewjk64.project.services.ExpenseService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
public class ExpenseController {
  private final ExpenseService expenseService;

  @GetMapping("/expenses")
  public ResponseEntity<Page<Expense>> getAllExpensesByUserId(
      @RequestParam(required = true) int user_id,
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int page_size) throws Exception {
    Pageable pageable = PageRequest.of(page, page_size);
    return ResponseEntity.ok(
        expenseService.getAllExpenseByUserId(pageable, user_id));
  }

  @PostMapping("/expenses")
  public ResponseEntity<Expense> postExpense(
      @RequestBody(required = true) PostExpenseDto expense) throws Exception {
    return ResponseEntity.ok(
        expenseService.postExpense(expense));
  }
}

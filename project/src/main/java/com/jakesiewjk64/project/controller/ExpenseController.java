package com.jakesiewjk64.project.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.ErrorResponseDto;
import com.jakesiewjk64.project.dto.PostExpenseDto;
import com.jakesiewjk64.project.services.ExpenseService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
public class ExpenseController {
  private final ExpenseService expenseService;

  @GetMapping("/expenses")
  public ResponseEntity<Object> getAllExpenses(
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int page_size) {
    try {
      Pageable pageable = PageRequest.of(page, page_size);
      return ResponseEntity.ok(
          expenseService.getAllExpense(pageable));
    } catch (Exception e) {
      return new ResponseEntity<>(
          new ErrorResponseDto("Could not get expenses. If this error persists please contact support.",
              HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/expenses")
  public ResponseEntity<Object> postExpense(
      @RequestBody(required = true) PostExpenseDto expense) {
    try {
      return ResponseEntity.ok(
          expenseService.postExpense(expense));
    } catch (Exception e) {
      return new ResponseEntity<>(
          new ErrorResponseDto("Could not save expenses. If this error persists please contact support.",
              HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST);
    }
  }
}

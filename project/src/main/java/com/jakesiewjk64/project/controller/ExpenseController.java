package com.jakesiewjk64.project.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.ExpenseDto;
import com.jakesiewjk64.project.dto.ExpenseStatsDto;
import com.jakesiewjk64.project.models.Expense;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.services.AuthenticationService;
import com.jakesiewjk64.project.services.ExpenseService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
public class ExpenseController {
  private final ExpenseService expenseService;
  private final AuthenticationService authenticationService;

  @GetMapping("/expenses/exportExpenseToCSV")
  public void exportExpenseToCSV(
      HttpServletResponse response,
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token,
      @RequestParam(required = true) int user_id,
      @RequestParam(required = false) LocalDate start_date,
      @RequestParam(required = false) LocalDate end_date) throws Exception {

    User current_user = authenticationService.getCurrentUser(token);

    if (current_user.getId() != user_id) {
      throw new Exception("You are not authorized to view expense for this user.");
    }

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=expense_" + dateFormat.format(new Date()) + ".csv";
    response.setContentType("application/octet-stream");
    response.setHeader(headerKey, headerValue);

    expenseService.exportExpenseToCSV(user_id, start_date, end_date, response);
  }

  @GetMapping("/expenses/getExpenseStatsByUserId")
  public ResponseEntity<Map<String, ExpenseStatsDto>> getExpenseStatsByUserId(
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token,
      @RequestParam(required = false) LocalDate start_date,
      @RequestParam(required = false) LocalDate end_date,
      @RequestParam(required = true) int user_id) throws Exception {

    User current_user = authenticationService.getCurrentUser(token);

    if (current_user.getId() != user_id) {
      throw new Exception("You are not authorized to view expense for this user.");
    }

    return ResponseEntity.ok(
        expenseService.getExpenseStats(user_id, start_date, end_date));
  }

  @GetMapping("/expenses")
  public ResponseEntity<Page<ExpenseDto>> getAllExpensesByUserId(
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token,
      @RequestParam(required = false, defaultValue = "date") String sortBy,
      @RequestParam(required = false, defaultValue = "0") String order,
      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(required = false) LocalDate start_date,
      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(required = false) LocalDate end_date,
      @RequestParam(required = true) int user_id,
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int page_size) throws Exception {

    User current_user = authenticationService.getCurrentUser(token);

    if (current_user.getId() != user_id) {
      throw new Exception("You are not authorized to view expense for this user.");
    }

    Sort sort = Integer.parseInt(order) == 0 ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
    Pageable pageable = PageRequest.of(page, page_size, sort);

    Map<String, Object> conditionMap = buildConditionMap(start_date, end_date, user_id);

    return ResponseEntity.ok(
        expenseService.getAllExpenseByUserId(pageable, conditionMap));
  }

  @GetMapping("/expenses/getExpenseById")
  public ResponseEntity<Expense> getExpenseById(
      @RequestParam(required = false) String expense_id,
      @RequestParam(required = false) int user_id,
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token) throws Exception {
    User current_user = authenticationService.getCurrentUser(token);

    if (current_user.getId() != user_id) {
      throw new Exception("You are not authorized to view expense for this user.");
    }

    return ResponseEntity.ok(
        expenseService.getExpenseById(expense_id, user_id));
  }

  @PostMapping("/expenses")
  public ResponseEntity<Expense> postExpense(
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token,
      @RequestBody(required = true) Expense expense) throws Exception {
    User current_user = authenticationService.getCurrentUser(token);

    if (current_user.getId() != expense.getUser_id()) {
      throw new Exception("You are not authorized to save expense for this user.");
    }

    return ResponseEntity.ok(
        expenseService.postExpense(expense));
  }

  @DeleteMapping("/expenses")
  public ResponseEntity<String> deleteExpense(
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token,
      @RequestParam(required = true) String expense_id) throws Exception {
    User current_user = authenticationService.getCurrentUser(token);

    return ResponseEntity.ok(
        expenseService.deleteExpense(expense_id, current_user.getId()));
  }

  private Map<String, Object> buildConditionMap(LocalDate start_date, LocalDate end_date, int user_id) {
    Map<String, Object> conditionMap = new HashMap<>();
    conditionMap.put("user_id", user_id);

    if (start_date != null) {
      conditionMap.put("start_date", start_date);
    }

    if (end_date != null) {
      conditionMap.put("end_date", end_date);
    }

    return conditionMap;
  }
}

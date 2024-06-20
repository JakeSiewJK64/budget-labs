package com.jakesiewjk64.project.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.ExpenseDto;
import com.jakesiewjk64.project.dto.ExpenseStatsDto;
import com.jakesiewjk64.project.models.Expense;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.repositories.IExpenseRepository;
import com.jakesiewjk64.project.repositories.IUserRepository;
import com.jakesiewjk64.project.specifications.ExpenseSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

  private final IExpenseRepository expenseRepository;
  private final IUserRepository userRepository;
  private final ModelMapper modelMapper;

  public ExpenseStatsDto getExpenseStats(int user_id, LocalDate target_date) throws Exception {
    try {
      // query for expenses
      List<Expense> expenses = expenseRepository.getByYearAndMonth(
          target_date.getYear(),
          target_date.getMonthValue(),
          user_id);

      double total = 0;
      double current_day_total = 0;
      double current_month_highest = 0;
      double current_day_highest = 0;

      for (Expense e : expenses) {
        total += e.getAmount();

        if (e.getAmount() > current_month_highest) {
          current_month_highest = e.getAmount();
        }

        if (target_date.isEqual(e.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate())) {
          current_day_total += e.getAmount();

          if (e.getAmount() > current_day_highest) {
            current_day_highest = e.getAmount();
          }
        }
      }

      return ExpenseStatsDto.builder()
          .current_month_highest(current_month_highest)
          .current_day_highest(current_day_highest)
          .current_day_total(current_day_total)
          .total_expense(total)
          .build();
    } catch (Exception e) {
      throw new Exception("There was a problem generating statistics. If this error persists please contact support.");
    }
  }

  public Page<ExpenseDto> getAllExpenseByUserId(Pageable pageable, Map<String, Object> condition) throws Exception {
    try {
      Specification<Expense> specs = Specification.where(null);

      String user_id = String.valueOf(condition.get("user_id"));
      LocalDate start_date = (LocalDate) condition.get("start_date");
      LocalDate end_date = (LocalDate) condition.get("end_date");

      specs = specs.and(ExpenseSpecification.equalsUserId(Integer.valueOf(user_id)));
      specs = specs.and(ExpenseSpecification.withinDateRange(start_date, end_date));

      Page<Expense> expensePage = expenseRepository.findAll(specs, pageable);

      return expensePage.map(expense -> modelMapper.map(expense, ExpenseDto.class));
    } catch (Exception e) {
      throw new Exception("Could not query for expenses. If this error persists please contact support.");
    }
  }

  public Expense postExpense(Expense expense) throws Exception {
    try {
      Optional<User> user = userRepository.findById(expense.getUser_id());

      if (!user.isPresent()) {
        throw new Exception("User with this id not found.");
      }

      return expenseRepository
          .save(Expense
              .builder()
              .id(expense.getId())
              .amount(expense.getAmount())
              .date(expense.getDate())
              .user_id(user.get().getId())
              .description(expense.getDescription())
              .build());
    } catch (Exception e) {
      throw new Exception("Could not save expenses. If this error persists please contact support.");
    }
  }

  public Expense getExpenseById(String expense_id, int user_id) throws Exception {
    try {
      return expenseRepository.findOne(ExpenseSpecification.getExpenseById(expense_id, user_id)).orElseThrow();
    } catch (Exception e) {
      throw new Exception("There was a problem getting the expense. If this error persists please contact support.");
    }
  }
}
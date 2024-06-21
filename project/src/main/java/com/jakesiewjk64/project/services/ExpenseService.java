package com.jakesiewjk64.project.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

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

  /**
   * 
   * @param user_id
   * @param target_date
   * @param recall_month number of months to recall back to generate past reports
   * @return
   * @throws Exception
   */
  public Map<String, ExpenseStatsDto> getExpenseStats(int user_id, LocalDate start_date, LocalDate end_date)
      throws Exception {
    try {

      Specification<Expense> specs = Specification.where(null);
      specs = specs.and(ExpenseSpecification.equalsUserId(user_id));
      specs = specs.and(ExpenseSpecification.withinDateRange(start_date, end_date));

      // query for expenses
      List<Expense> expenses = expenseRepository.findAll(specs);

      Map<String, ExpenseStatsDto> expense_stats_map = new HashMap<>();

      int current_month = end_date.getMonthValue();

      for (Expense e : expenses) {
        int month = e.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue();

        ExpenseStatsDto stats = expense_stats_map.getOrDefault(String.valueOf(month), ExpenseStatsDto.builder()
            .current_day_highest(0)
            .current_day_total(0)
            .current_month_highest(0)
            .total_expense(0)
            .build());

        double monthly_total = stats.getTotal_expense() + e.getAmount();
        double current_month_highest = stats.getCurrent_month_highest() < e.getAmount() ? e.getAmount()
            : stats.getCurrent_month_highest();

        if (month == current_month) {
          double current_day_total = stats.getCurrent_day_total();
          double current_day_highest = stats.getCurrent_day_highest() < e.getAmount() ? e.getAmount()
              : stats.getCurrent_day_highest();

          if (start_date.isEqual(e.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate())) {
            current_day_total += e.getAmount();

            if (current_day_highest < e.getAmount()) {
              current_day_highest = e.getAmount();
            }
          }

          expense_stats_map.put(String.valueOf(month), ExpenseStatsDto.builder()
              .current_day_total(current_day_total)
              .current_month_highest(current_month_highest)
              .current_day_highest(current_day_highest)
              .total_expense(monthly_total)
              .build());
        } else {
          expense_stats_map.put(String.valueOf(month), ExpenseStatsDto.builder()
              .total_expense(monthly_total)
              .current_month_highest(current_month_highest)
              .current_day_highest(0)
              .current_day_total(0)
              .build());
        }
      }

      return expense_stats_map;
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

  public String deleteExpense(String expense_id, int user_id) throws Exception {
    try {
      int affectedRows = expenseRepository.deleteById(UUID.fromString(expense_id), user_id);

      if (affectedRows == 0) {
        throw new NoSuchElementException("Expense with that id does not exist.");
      }

      return expense_id;
    } catch (NoSuchElementException e) {
      throw new Exception("Expense with that id does not exist.");
    } catch (Exception e) {
      throw new Exception("Could not delete expense. If this error persists please contact support.");
    }
  }

  public Expense getExpenseById(String expense_id, int user_id) throws Exception {
    try {
      return expenseRepository.findOne(ExpenseSpecification.getExpenseById(expense_id, user_id)).orElseThrow();
    } catch (NoSuchElementException e) {
      throw new Exception("Expense with that id does not exist.");
    } catch (Exception e) {
      throw new Exception("There was a problem getting the expense. If this error persists please contact support.");
    }
  }
}
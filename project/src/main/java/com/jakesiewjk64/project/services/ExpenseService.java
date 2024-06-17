package com.jakesiewjk64.project.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.ExpenseDto;
import com.jakesiewjk64.project.dto.ExpenseStatsDto;
import com.jakesiewjk64.project.dto.PostExpenseDto;
import com.jakesiewjk64.project.models.Expense;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.repositories.IExpenseRepository;
import com.jakesiewjk64.project.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

  private final IExpenseRepository expenseRepository;
  private final IUserRepository userRepository;
  private final ModelMapper modelMapper;

  public ExpenseStatsDto getExpenseStats(int user_id, Date target_date) throws Exception {
    try {

      // set default target date to current system date
      Calendar date = Calendar.getInstance();
      date.setTime(target_date != null ? target_date : new Date());

      // query for expenses
      List<Expense> expenses = expenseRepository.getByYearAndMonth(
          date.get(Calendar.YEAR),
          date.get(Calendar.MONTH) + 1,
          user_id);

      double total = 0f;
      double current_month_highest = 0;
      double current_day_highest = 0;

      for (Expense e : expenses) {
        total += e.getAmount();

        if (e.getAmount() > current_month_highest) {
          current_month_highest = e.getAmount();
        }

        if (e.compareDate(date.getTime()) && e.getAmount() > current_day_highest) {
          current_day_highest = e.getAmount();
        }
      }

      return ExpenseStatsDto.builder()
          .current_month_highest(current_month_highest)
          .current_day_highest(current_day_highest)
          .total_expense(total)
          .build();
    } catch (Exception e) {
      throw new Exception("There was a problem generating statistics. If this error persists please contact support.");
    }
  }

  public Page<ExpenseDto> getAllExpenseByUserId(Pageable pageable, int user_id) throws Exception {
    try {
      Specification<Expense> spec = Specification
          .where((root, query, criteriaBuilder) -> criteriaBuilder.isNotNull(root.get("user_id")));

      spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user_id"), user_id));

      Page<Expense> expensePage = expenseRepository.findAll(spec, pageable);

      return expensePage.map(expense -> modelMapper.map(expense, ExpenseDto.class));
    } catch (Exception e) {
      throw new Exception("Could not query for expenses. If this error persists please contact support.");
    }
  }

  public Expense postExpense(PostExpenseDto expense) throws Exception {
    try {
      Optional<User> user = userRepository.findById(expense.getUser_id());

      if (!user.isPresent()) {
        throw new Exception("User with this id not found.");
      }

      return expenseRepository
          .save(Expense
              .builder()
              .amount(expense.getAmount())
              .date(expense.getDate())
              .user_id(user.get().getId())
              .description(expense.getDescription())
              .build());
    } catch (Exception e) {
      throw new Exception("Could not save expenses. If this error persists please contact support.");
    }
  }
}
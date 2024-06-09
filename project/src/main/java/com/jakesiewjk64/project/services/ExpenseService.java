package com.jakesiewjk64.project.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.PostExpenseDto;
import com.jakesiewjk64.project.models.Expense;
import com.jakesiewjk64.project.repositories.IExpenseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

  private final IExpenseRepository expenseRepository;

  public Page<Expense> getAllExpense(Pageable pageable) {
    Specification<Expense> spec = Specification.where(null);
    return expenseRepository.findAll(spec, pageable);
  }

  public Expense postExpense(PostExpenseDto expense) throws Exception {
    try {
      return expenseRepository
          .save(Expense
              .builder()
              .amount(expense.getAmount())
              .date(expense.getDate())
              .build());
    } catch (Exception e) {
      throw new Exception(e);
    }
  }
}
package com.jakesiewjk64.project.services;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.ExpenseDto;
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
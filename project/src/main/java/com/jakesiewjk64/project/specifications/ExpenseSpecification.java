package com.jakesiewjk64.project.specifications;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.jakesiewjk64.project.models.Expense;

import jakarta.persistence.criteria.Predicate;

public class ExpenseSpecification {
  public static Specification<Expense> equalsUserId(Integer user_id) {
    return (root, query, builder) -> builder.equal(root.get("user_id"), user_id);
  }

  public static Specification<Expense> getExpenseById(String expense_id, Integer user_id) {
    return (root, query, builder) -> {
      Predicate equalsUserId = builder.equal(root.get("user_id"), user_id);
      Predicate equalsExpenseId = builder.equal(root.get("id").as(String.class), expense_id);

      return builder.and(equalsUserId, equalsExpenseId);
    };
  }

  public static Specification<Expense> withinDateRange(LocalDate startDate, LocalDate endDate) {
    return (root, query, builder) -> {
      Predicate greaterThanOrEqualToStart = builder.greaterThan(root.get("date").as(LocalDate.class),
          startDate);
      Predicate beforeEndDate = builder.lessThanOrEqualTo(root.get("date").as(LocalDate.class),
          endDate);

      return builder.and(greaterThanOrEqualToStart, beforeEndDate);
    };
  }
}

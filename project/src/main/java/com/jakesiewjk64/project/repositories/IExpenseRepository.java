package com.jakesiewjk64.project.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.jakesiewjk64.project.models.Expense;

public interface IExpenseRepository extends JpaRepository<Expense, Integer>, JpaSpecificationExecutor<Expense> {
  @Query(value = "SELECT expense FROM Expense expense WHERE expense.user_id = :user_id AND MONTH(expense.date) = :month AND YEAR(expense.date) = :year")
  List<Expense> getByYearAndMonth(@Param("year") int year, @Param("month") int month, @Param("user_id") int user_id);

  @Modifying
  @Transactional
  @Query(value = "DELETE FROM Expense expense WHERE expense.id = :id AND expense.user_id = :user_id")
  int deleteById(@Param("id") UUID id, @Param("user_id") int user_id);
}

package com.jakesiewjk64.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.jakesiewjk64.project.models.Expense;

public interface IExpenseRepository extends JpaRepository<Expense, Integer>, JpaSpecificationExecutor<Expense> {
}

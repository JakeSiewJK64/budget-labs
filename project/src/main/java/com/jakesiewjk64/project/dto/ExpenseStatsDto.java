package com.jakesiewjk64.project.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExpenseStatsDto {
  private double total_expense;
  private double current_day_total;
  private double current_month_highest;
  private double current_day_highest;
  private List<TinyExpenseDto> expense_arr;
}

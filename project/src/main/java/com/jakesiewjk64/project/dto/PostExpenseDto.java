package com.jakesiewjk64.project.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostExpenseDto {
  private double amount;
  private Date date;
  private int user_id;
}

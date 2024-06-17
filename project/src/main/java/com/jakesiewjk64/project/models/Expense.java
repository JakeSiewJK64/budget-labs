package com.jakesiewjk64.project.models;

import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "expense")
public class Expense {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String id;
  private double amount;
  private Date date;
  private String description;
  private int user_id;

  /**
   * Returns true if both dates are the same
   * 
   * @param date
   * @return boolean
   */
  public boolean compareDate(Date date) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd 00:00:00.0");
    String target_date = sdf.format(date);
    return this.date.toString().equals(target_date);
  }
}

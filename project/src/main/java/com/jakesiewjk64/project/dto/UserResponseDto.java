package com.jakesiewjk64.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
  private int id;
  private String email;
  private String first_name;
  private String last_name;
  private double income;
}

package com.jakesiewjk64.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDto {
  private String email;
  private String firstname;
  private String lastname;
}

package com.jakesiewjk64.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.jakesiewjk64.project.dto.ErrorResponseDto;

@ControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler()
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public @ResponseBody ErrorResponseDto handleException(Exception e) {
    return new ErrorResponseDto(e.getMessage(), HttpStatus.BAD_REQUEST);
  }
}

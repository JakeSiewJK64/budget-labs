package com.jakesiewjk64.project.controller;

import org.modelmapper.ModelMapper;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.UserResponseDto;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.services.AuthenticationService;
import com.jakesiewjk64.project.services.UserService;

import lombok.AllArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@AllArgsConstructor
public class UserController {
  private final UserService userService;
  private final AuthenticationService authenticationService;
  private final ModelMapper modelMapper;

  @GetMapping("/users/getCurrentUser")
  public ResponseEntity<UserResponseDto> getCurrentUser(
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token) throws Exception {
    User currentUser = authenticationService.getCurrentUser(token);
    return ResponseEntity.ok(modelMapper.map(currentUser, UserResponseDto.class));
  }

  @GetMapping("/users")
  public ResponseEntity<Page<UserResponseDto>> getAllUsers(
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int page_size,
      @RequestParam(required = false) String email

  ) throws Exception {
    Pageable pageable = PageRequest.of(page, page_size);
    return ResponseEntity.ok(userService.findAll(email, pageable));
  }

}

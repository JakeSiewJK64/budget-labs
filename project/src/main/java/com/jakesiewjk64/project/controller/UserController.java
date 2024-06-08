package com.jakesiewjk64.project.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.services.UserService;

@RequestMapping("/api/v1")
@RestController
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/users")
  public Iterable<User> getAllUsers(
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int page_size,
      @RequestParam(required = false) String email

  ) {
    Pageable pageable = PageRequest.of(page, page_size);
    return userService.findAll(email, pageable);
  }

}

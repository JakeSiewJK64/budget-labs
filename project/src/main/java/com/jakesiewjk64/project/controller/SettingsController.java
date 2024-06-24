package com.jakesiewjk64.project.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.UserResponseDto;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.services.AuthenticationService;
import com.jakesiewjk64.project.services.UserService;

import lombok.AllArgsConstructor;

@RequestMapping("/api/v1/settings")
@RestController
@AllArgsConstructor
public class SettingsController {
  private final UserService userService;
  private final AuthenticationService authenticationService;

  @PostMapping("/updateUserDetails")
  public ResponseEntity<UserResponseDto> updateUserDetails(
      @RequestHeader(required = false, value = HttpHeaders.AUTHORIZATION) String token,
      @RequestBody(required = true) UserResponseDto request) throws Exception {
    User current_user = authenticationService.getCurrentUser(token);

    if (current_user.getId() != request.getId()) {
      throw new Exception("You are not authorized to update details for this user.");
    }

    System.out.println(current_user.getId());
    System.out.println(request);

    userService.partialUpdateUser(request);

    return ResponseEntity.ok(request);
  }
}

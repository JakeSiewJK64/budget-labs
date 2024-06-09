package com.jakesiewjk64.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.AuthRequestDto;
import com.jakesiewjk64.project.dto.RegisterRequestDto;
import com.jakesiewjk64.project.dto.VerifyRequestDto;
import com.jakesiewjk64.project.services.AuthenticationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  @PostMapping("/register")
  public ResponseEntity<Object> register(
      @RequestBody RegisterRequestDto request) throws Exception {
    return ResponseEntity.ok(authenticationService.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<Object> authenticate(@RequestBody AuthRequestDto request) throws Exception {
    return ResponseEntity.ok(authenticationService.authenticate(request));
  }

  @PostMapping("/verify")
  public ResponseEntity<Boolean> verify(@RequestBody VerifyRequestDto request) {
    return ResponseEntity.ok(authenticationService.verifyToken(request));
  }
}

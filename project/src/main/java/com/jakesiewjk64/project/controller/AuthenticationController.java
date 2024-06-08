package com.jakesiewjk64.project.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.project.dto.AuthRequestDto;
import com.jakesiewjk64.project.dto.ErrorResponseDto;
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
      @RequestBody RegisterRequestDto request) {
    try {
      return ResponseEntity.ok(authenticationService.register(request));
    } catch (DataIntegrityViolationException e) {
      return new ResponseEntity<>(new ErrorResponseDto("User already exists.", HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(
          new ErrorResponseDto("Could not register user. If this error persists please contact support.",
              HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/authenticate")
  public ResponseEntity<Object> authenticate(@RequestBody AuthRequestDto request) {
    try {
      return ResponseEntity.ok(authenticationService.authenticate(request));
    } catch (Exception e) {
      return new ResponseEntity<>(
          new ErrorResponseDto("Could not authenticate user. If this error persists please contact support.",
              HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/verify")
  public ResponseEntity<Boolean> verify(@RequestBody VerifyRequestDto request) {
    return ResponseEntity.ok(authenticationService.verifyToken(request));
  }
}

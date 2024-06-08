package com.jakesiewjk64.project.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.AuthRequestDto;
import com.jakesiewjk64.project.dto.AuthResponseDto;
import com.jakesiewjk64.project.dto.RegisterRequestDto;
import com.jakesiewjk64.project.dto.VerifyRequestDto;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.repositories.IUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final AuthenticationManager authenticationManager;
  private final IUserRepository repository;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;

  public AuthResponseDto register(RegisterRequestDto request) {
    var user = User.builder()
        .first_name(request.getFirstname())
        .last_name(request.getLastname())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .build();
    repository.save(user);
    var token = jwtService.generateToken(user);
    return AuthResponseDto.builder()
        .email(user.getEmail())
        .token(token)
        .build();
  }

  public AuthResponseDto authenticate(AuthRequestDto request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()));

    var user = repository.findUserByEmail(request.getEmail()).orElseThrow();
    var jwtToken = jwtService.generateToken(user);

    return AuthResponseDto
        .builder()
        .email(user.getEmail())
        .token(jwtToken)
        .build();
  }

  public boolean verifyToken(VerifyRequestDto request) {
    return jwtService.isTokenExpired(request.getToken());
  }
}

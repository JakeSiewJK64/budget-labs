package com.jakesiewjk64.project.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.AuthRequestDto;
import com.jakesiewjk64.project.dto.AuthResponseDto;
import com.jakesiewjk64.project.dto.RegisterRequestDto;
import com.jakesiewjk64.project.dto.VerifyRequestDto;
import com.jakesiewjk64.project.models.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;

  public User getCurrentUser(String token) throws Exception {
    String jwt = token.substring(7);
    String email = jwtService.extractUsername(jwt);
    User user = userService.findUserByEmail(email).orElseThrow();

    return user;
  }

  public AuthResponseDto register(RegisterRequestDto request) throws Exception {
    try {
      var user = User.builder()
          .first_name(request.getFirstname())
          .last_name(request.getLastname())
          .email(request.getEmail())
          .password(passwordEncoder.encode(request.getPassword()))
          .build();

      userService.saveUser(user);

      var token = jwtService.generateToken(user);
      return AuthResponseDto.builder()
          .email(user.getEmail())
          .token(token)
          .build();
    } catch (DataIntegrityViolationException e) {
      throw new Exception("User already exists. Please try again.");
    } catch (Exception e) {
      throw new Exception("Could not register user. If this error persists please contact support.");
    }
  }

  public AuthResponseDto authenticate(AuthRequestDto request) throws Exception {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              request.getEmail(),
              request.getPassword()));

      var user = userService.findUserByEmail(request.getEmail()).orElseThrow();
      var jwtToken = jwtService.generateToken(user);

      return AuthResponseDto
          .builder()
          .email(user.getEmail())
          .token(jwtToken)
          .build();
    } catch (BadCredentialsException e) {
      throw new Exception("Either your email or password was incorrect.");
    } catch (Exception e) {
      throw new Exception("Could not authenticate user. If this error persists please contact support.");
    }
  }

  public boolean verifyToken(VerifyRequestDto request) {
    return jwtService.isTokenExpired(request.getToken());
  }
}

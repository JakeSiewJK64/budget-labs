package com.jakesiewjk64.project.filters;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jakesiewjk64.project.facades.IAuthenticationFacade;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.services.JwtService;
import com.jakesiewjk64.project.services.UserService;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserService userService;
  private final IAuthenticationFacade authenticationFacade;
  private static final String[] WHITE_LIST_URL = {
      "/api/v1/auth"
  };

  @Override
  protected void doFilterInternal(
      @Nonnull HttpServletRequest request,
      @Nonnull HttpServletResponse response,
      @Nonnull FilterChain filterChain)
      throws ServletException, IOException {
    try {
      final String authHeader = request.getHeader("Authorization");
      final String jwt;
      final String userId;
      final String requestPath = request.getServletPath();

      if (authHeader == null || !authHeader.startsWith("Bearer ")
          || Arrays.stream(WHITE_LIST_URL).anyMatch(requestPath::contains)) {
        filterChain.doFilter(request, response);
        return;
      }

      jwt = authHeader.substring(7);
      userId = jwtService.extractSubject(jwt);

      if (userId != null && authenticationFacade.getAuthentication() == null) {

        User userDetails = userService.findUserById(Integer.parseInt(userId)).orElseThrow();

        if (jwtService.isTokenValid(jwt, userDetails)) {

          // create auth token
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
              userDetails,
              null,
              userDetails.getAuthorities());

          // set auth token details
          authToken.setDetails(
              new WebAuthenticationDetailsSource()
                  .buildDetails(request));

          // set authentication
          authenticationFacade.setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
      }
    } catch (Exception e) {
      Map<String, String> data = new HashMap<>();
      data.put("message", e.getMessage());
      data.put("status", HttpStatus.UNAUTHORIZED.toString());

      // declare object mapper
      ObjectMapper objectMapper = new ObjectMapper();

      response.setStatus(HttpStatus.UNAUTHORIZED.value());
      response.getOutputStream().print(objectMapper.writeValueAsString(data));
      response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    }
  }
}

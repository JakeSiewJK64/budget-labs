package com.jakesiewjk64.project.filters;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jakesiewjk64.project.facades.IAuthenticationFacade;
import com.jakesiewjk64.project.services.JwtService;

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
  private final UserDetailsService userDetailsService;
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
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String email;
    final String requestPath = request.getServletPath();

    if (authHeader == null || !authHeader.startsWith("Bearer ")
        || Arrays.stream(WHITE_LIST_URL).anyMatch(requestPath::contains)) {
      filterChain.doFilter(request, response);
      return;
    }

    jwt = authHeader.substring(7);
    email = jwtService.extractUsername(jwt);

    if (email != null && authenticationFacade.getAuthentication() == null) {

      UserDetails userDetails = userDetailsService.loadUserByUsername(email);

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
  }
}

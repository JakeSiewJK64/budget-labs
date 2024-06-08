package com.jakesiewjk64.project.facades;

import org.springframework.security.core.Authentication;

public interface IAuthenticationFacade {
  Authentication getAuthentication();

  void setAuthentication(Authentication authentication);
}

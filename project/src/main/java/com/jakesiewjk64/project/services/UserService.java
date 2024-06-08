package com.jakesiewjk64.project.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.repositories.IUserRepository;
import com.jakesiewjk64.project.specifications.UserSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final IUserRepository userRepository;

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findUserByEmail(email);
  }

  public Page<User> findAll(String email, Pageable pageable) {
    Specification<User> spec = Specification.where(null);

    if (email != null && !email.isEmpty()) {
      spec = spec.and(UserSpecification.hasEmail(email));
    }

    return userRepository.findAll(spec, pageable);
  }
}

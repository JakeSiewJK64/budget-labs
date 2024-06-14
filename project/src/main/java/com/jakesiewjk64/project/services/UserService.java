package com.jakesiewjk64.project.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.UserResponseDto;
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

  public User saveUser(User user) {
    return userRepository.save(user);
  }

  public Page<UserResponseDto> findAll(String email, Pageable pageable) throws Exception {
    try {
      Specification<User> spec = Specification.where(null);

      if (email != null && !email.isEmpty()) {
        spec = spec.and(UserSpecification.hasEmail(email));
      }

      Page<User> usersResult = userRepository.findAll(spec, pageable);

      return usersResult.map(user -> new UserResponseDto(
          user.getEmail(),
          user.getFirst_name(),
          user.getLast_name()));
    } catch (Exception e) {
      throw new Exception("Could not query for users. If this error persists please contact support.");
    }
  }
}

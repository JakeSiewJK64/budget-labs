package com.jakesiewjk64.project.specifications;

import org.springframework.data.jpa.domain.Specification;

import com.jakesiewjk64.project.models.User;

public class UserSpecification {
  public static Specification<User> hasEmail(String email) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("email"), email);
  }
}

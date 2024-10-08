package com.jakesiewjk64.project.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

  private static final String SECRET = "t5nPibbIYj8U7Cucj2kAnRkbiNHx6wzRau3faL_Jav8";

  public String extractSubject(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    try {
      return Jwts
          .parser()
          .setSigningKey(SECRET)
          .parseClaimsJws(token)
          .getBody();
    } catch (ExpiredJwtException e) {
      throw new JwtException("Token has expired");
    }
  }

  public String generateToken(User user) {
    return generateToken(new HashMap<>(), user);
  }

  public String generateToken(
      Map<String, Object> extraClaims,
      User user) {
    return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(String.valueOf(user.getId()))
        .setIssuedAt(new Date(System.currentTimeMillis()))

        // valid for 24 hours + 1000 millis
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
        .signWith(SignatureAlgorithm.HS256, SECRET)
        .compact();
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public boolean isTokenExpired(String token) {
    try {
      return extractExpiration(token).before(new Date());
    } catch (Exception e) {
      return true;
    }
  }

  public boolean isTokenValid(String token, User user) {
    final String userid = extractSubject(token);
    return userid.equals(String.valueOf(user.getId())) && !isTokenExpired(token);
  }
}

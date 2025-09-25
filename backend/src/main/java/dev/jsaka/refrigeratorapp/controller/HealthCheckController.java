package dev.jsaka.refrigeratorapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

  @GetMapping("/api/health") // http://localhost:8080/api/health というURLに対応させる
  public String healthCheck() {
    return "{\"status\": \"OK\"}";// JSON形式の文字列を返す
  }
}
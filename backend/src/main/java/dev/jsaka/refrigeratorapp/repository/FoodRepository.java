package dev.jsaka.refrigeratorapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jsaka.refrigeratorapp.entity.Food;


public interface FoodRepository extends JpaRepository<Food, Long> {
  
}

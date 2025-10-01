package dev.jsaka.refrigeratorapp.dto;

import java.time.LocalDate;

import dev.jsaka.refrigeratorapp.entity.Food;

public class FoodResponseDto {

  private Long id;
  private String name;
  private String category;
  private String icon;
  private String unit;
  private LocalDate expirationDate;
  private Double quantity;

  public FoodResponseDto(Food food) {
    this.id = food.getId();
    this.name = food.getName();
    this.category = food.getCategory();
    this.icon = food.getIcon();
    this.unit = food.getUnit();
    this.expirationDate = food.getExpirationDate();
    this.quantity = food.getQuantity();
  };

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getCategory() {
    return category;
  }

  public String getIcon() {
    return icon;
  }

  public String getUnit() {
    return unit;
  }

  public LocalDate getExpirationDate() {
    return expirationDate;
  }

  public Double getQuantity() {
    return quantity;
  }
}

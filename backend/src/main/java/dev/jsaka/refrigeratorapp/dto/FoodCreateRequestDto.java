package dev.jsaka.refrigeratorapp.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class FoodCreateRequestDto {

    @NotBlank(message = "食品名は必須です")
    @Size(max = 20, message = "食品名は20文字以内で入力してください")
    private String name;

    @NotBlank(message = "カテゴリは必須です")
    private String category;

    private String icon;

    @NotBlank(message = "単位は必須です")
    private String unit;

    @NotNull(message = "賞味期限は必須です")
    private LocalDate expirationDate;

    @NotNull(message = "数量は必須です")
    private Double quantity;

    private String memo;

    public FoodCreateRequestDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

}

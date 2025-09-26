package dev.jsaka.refrigeratorapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.jsaka.refrigeratorapp.entity.Food;
import dev.jsaka.refrigeratorapp.exception.ResourceNotFoundException;
import dev.jsaka.refrigeratorapp.repository.FoodRepository;

@Service
public class FoodService {

  private final FoodRepository foodRepository;

  public FoodService(FoodRepository foodRepository) {
    this.foodRepository = foodRepository;
  }

  public List<Food> findAll() {
    return foodRepository.findAll();
  }

  public Food create(Food food) {
    food.setId(null);
    return foodRepository.save(food);
  }

  public Food update(Long id, Food foodDetails) {
    // まず、更新対象のFoodがデータベースに存在するかを確認する
    Food existingFood = findById(id);

    // 存在するFoodエンティティの各フィールドを、リクエストされた内容で更新する
    existingFood.setName(foodDetails.getName());
    existingFood.setExpirationDate(foodDetails.getExpirationDate());
    existingFood.setQuantity(foodDetails.getQuantity());

    // 更新したFoodエンティティを保存する
    return foodRepository.save(existingFood);
  }

  public void delete(Long id) {
    // まず、削除対象のFoodがデータベースに存在するかを確認する
    Food existingFood = findById(id);

    // 存在すれば削除を実行
    foodRepository.delete(existingFood);
  }

  // IDを指定して食品を1件取得するメソッド
  public Food findById(Long id) {
    return foodRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + id));
  }
}

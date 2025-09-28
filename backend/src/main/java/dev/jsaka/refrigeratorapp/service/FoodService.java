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

// ストリームを使って特定のuserIdを持つものだけをフィルタリングする
  public List<Food> findAllByUserId(Long userId) {
    return foodRepository.findAll().stream()
        .filter(food -> food.getUserId().equals(userId))
        .toList();
  }

  public Food create(Food food, Long userId) {
    food.setId(null);
    food.setUserId(userId); // 誰の食品かを記録する
    return foodRepository.save(food);
  }

  public Food update(Long id, Food foodDetails, Long userId) {
    // まず、更新対象のFoodがデータベースに存在するかを確認する(userId指定)
    Food existingFood = findByIdAndUserId(id, userId);

    // 存在するFoodエンティティの各フィールドを、リクエストされた内容で更新する
    existingFood.setName(foodDetails.getName());
    existingFood.setExpirationDate(foodDetails.getExpirationDate());
    existingFood.setQuantity(foodDetails.getQuantity());

    // 更新したFoodエンティティを保存する
    return foodRepository.save(existingFood);
  }

  public void delete(Long id, Long userId) {
    // まず、削除対象のFoodがデータベースに存在するかを確認する(userId指定)
    Food existingFood = findByIdAndUserId(id, userId);

    // 存在すれば削除を実行
    foodRepository.delete(existingFood);
  }

  // IDを指定して食品を1件取得するメソッド(userIdも一緒に特定)
  public Food findByIdAndUserId(Long id, Long userId) {
    Food food = foodRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + id));

    // IDで見つかった食品が、本当にそのユーザーの物かをチェックする
    if (!food.getUserId().equals(userId)) {
      // 他人の食品にアクセスしようとした場合も「見つからない」として扱うのが一般的
      throw new ResourceNotFoundException("Food not found with id: " + id);
    }
    return food;
  }
}

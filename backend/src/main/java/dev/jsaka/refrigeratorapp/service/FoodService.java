package dev.jsaka.refrigeratorapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.jsaka.refrigeratorapp.dto.FoodCreateRequestDto;
import dev.jsaka.refrigeratorapp.dto.FoodUpdateRequestDto;
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

  public Food create(FoodCreateRequestDto foodDto, Long userId) {
    // 1. 新しい Food エンティティのインスタンスを作成する
    Food newFood = new Food();

    // 2. DTO（申込書）からデータを取り出して、エンティティ（台帳）に詰め替える
    newFood.setName(foodDto.getName());
    newFood.setCategory(foodDto.getCategory());
    newFood.setIcon(foodDto.getIcon());
    newFood.setUnit(foodDto.getUnit());
    newFood.setQuantity(foodDto.getQuantity());
    newFood.setExpirationDate(foodDto.getExpirationDate());
    newFood.setUserId(userId); // ヘッダーから受け取ったuserIdも設定

    // 3. 詰め替えたエンティティをDBに保存する
    return foodRepository.save(newFood);
  }

  public Food update(Long id, FoodUpdateRequestDto foodDto, Long userId) {
    // まず、更新対象のFoodがデータベースに存在するかを確認する(userId指定)
    // (このメソッドの内部で、存在チェックと権限チェックが完了する)
    Food existingFood = this.findByIdAndUserId(id, userId);

    // 2. DTOのデータを使って、既存エンティティのフィールドを上書きする
    existingFood.setName(foodDto.getName());
    existingFood.setCategory(foodDto.getCategory());
    existingFood.setIcon(foodDto.getIcon());
    existingFood.setUnit(foodDto.getUnit());
    existingFood.setQuantity(foodDto.getQuantity());
    existingFood.setExpirationDate(foodDto.getExpirationDate());

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

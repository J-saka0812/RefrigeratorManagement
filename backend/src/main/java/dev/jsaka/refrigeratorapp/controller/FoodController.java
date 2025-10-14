package dev.jsaka.refrigeratorapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.jsaka.refrigeratorapp.dto.FoodCreateRequestDto;
import dev.jsaka.refrigeratorapp.dto.FoodResponseDto;
import dev.jsaka.refrigeratorapp.dto.FoodUpdateRequestDto;
import dev.jsaka.refrigeratorapp.entity.Food;
import dev.jsaka.refrigeratorapp.service.FoodService;
import jakarta.validation.Valid;

// @RestControllerが付いたクラスのメソッドがオブジェクトを返すと、内蔵されているJacksonというライブラリが、自動的にそれをJSON形式の文字列に変換して、HTTPレスポンスとして返してくれる
@RestController // このクラス内のすべてのメソッドのURLの前に /api/foods が自動的に付与
@RequestMapping("/api/foods") // このコントローラは "/api/foods" というURLの基盤を担当
public class FoodController {
  private final FoodService foodService;

  @Autowired // Springがアプリケーションを起動する際に、自動的に、事前に作成しておいたFoodRepositoryを実装
  public FoodController(FoodService foodService) {
    this.foodService = foodService;
  }

  @GetMapping /// api/foods というURLに対する GET リクエストが来た場合に、このgetAllFoods()メソッドが呼び出される
  public List<Food> getAllFoods(@RequestAttribute("userId") Long userId) {
    return foodService.findAllByUserId(userId); // リポジトリを使って、データベースから全件取得する
    // 自動的にSELECT * FROM foods; に相当するSQLが実行され、取得した全データがFoodオブジェクトのリスト(List<Food>)に入る
  }

  // POSTリクエスト (http://localhost:8080/api/foods) に対応
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED) // 成功した場合、HTTPステータスコード201 (Created) を返す
  public ResponseEntity<Food> createFood(@Valid @RequestBody FoodCreateRequestDto foodDto, @RequestHeader("X-User-Id") Long userId) {
    // @RequestBody: フロントエンドから送られてくるJSON形式のデータを、自動的にFoodクラスのオブジェクトに変換
    // リクエストのJSONボディをFoodオブジェクトに変換し、データベースに保存
    // ServiceにDTOを渡して、内部でエンティティへの変換と保存を行ってもらう
        Food createdFood = foodService.create(foodDto, userId);
    // 201 Createdステータスで返すのがRESTfulな作法
    return new ResponseEntity<>(createdFood, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Food> updateFood(
      @PathVariable Long id, // ★URLからIDを受け取る
        @Valid @RequestBody FoodUpdateRequestDto foodDto, // ★ボディから更新データを受け取る
        @RequestHeader("X-User-Id") Long userId) {

    Food updatedFood = foodService.update(id, foodDto, userId);
    return ResponseEntity.ok(updatedFood);
  }

  // DELETEリクエスト (http://localhost:8080/api/foods/{id})
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteFood(
      @PathVariable Long id,
      @RequestAttribute("userId") Long userId) {
    foodService.delete(id, userId);
    return ResponseEntity.noContent().build();// 成功時、204 No Contentを返す
  }

  @GetMapping("/{id}")
  public ResponseEntity<FoodResponseDto> getFood(
      @PathVariable Long id,
      @RequestAttribute("userId") Long userId) {
    // Serviceを呼び出すだけ, Controllerは食品を探すロジックを知らない。
    Food food = foodService.findByIdAndUserId(id, userId);

    FoodResponseDto responseDto = new FoodResponseDto(food);
    // Serviceが正常にfoodを返してくれたら、それをOKで包んで返すだけ。
    return ResponseEntity.ok(responseDto);
  }
}

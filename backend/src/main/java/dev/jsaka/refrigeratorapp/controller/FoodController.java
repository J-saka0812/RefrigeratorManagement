package dev.jsaka.refrigeratorapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.jsaka.refrigeratorapp.entity.Food;
import dev.jsaka.refrigeratorapp.repository.FoodRepository;

// @RestControllerが付いたクラスのメソッドがオブジェクトを返すと、内蔵されているJacksonというライブラリが、自動的にそれをJSON形式の文字列に変換して、HTTPレスポンスとして返してくれる
@RestController // このクラス内のすべてのメソッドのURLの前に /api/foods が自動的に付与
@RequestMapping("/api/foods") // このコントローラは "/api/foods" というURLの基盤を担当
public class FoodController {
  private final FoodRepository foodRepository;

  @Autowired // Springがアプリケーションを起動する際に、自動的に、事前に作成しておいたFoodRepositoryを実装
  public FoodController(FoodRepository foodRepository) {
    this.foodRepository = foodRepository;
  }

  @GetMapping///api/foods というURLに対する GET リクエストが来た場合に、このgetAllFoods()メソッドが呼び出される
  public List<Food> getAllFoods(){
    return foodRepository.findAll(); //リポジトリを使って、データベースから全件取得する
    // 自動的にSELECT * FROM foods; に相当するSQLが実行され、取得した全データがFoodオブジェクトのリスト(List<Food>)に入る
  }

  // POSTリクエスト (http://localhost:8080/api/foods) に対応
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)// 成功した場合、HTTPステータスコード201 (Created) を返す
  //@RequestBody: フロントエンドから送られてくるJSON形式のデータを、自動的にFoodクラスのオブジェクトに変換
  public Food createFood(@RequestBody Food newFood){
     // リクエストのJSONボディをFoodオブジェクトに変換し、データベースに保存
    return foodRepository.save(newFood);
    //save(): 渡されたオブジェクトをデータベースに保存（INSERTまたはUPDATE）し、IDが採番された後の最新のオブジェクトを返す
  }
}

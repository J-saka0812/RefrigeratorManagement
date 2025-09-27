package dev.jsaka.refrigeratorapp.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component // このクラスをSpringの管理対象にする
public class UserIdInterceptor implements HandlerInterceptor {

  //Controllerのメソッドが呼ばれる「前」に実行されるメソッド
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    
    // 1. リクエストヘッダーから "X-User-Id" を取得する
    String userIdStr = request.getHeader("X-User-Id");

    // 2. ヘッダーが存在しない、または空の場合はエラー
    if (userIdStr == null || userIdStr.isBlank()) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
      response.getWriter().write("Missing X-User-Id header");
      return false; // falseを返すと、ここで処理が中断され、Controllerには到達しない
    }

    try {
      // 3. 文字列をLong型に変換してみる
      Long userId = Long.parseLong(userIdStr);
      
      // 4.取得したuserIdをリクエスト属性にセットする
      // これにより、この後のControllerでこの値を取り出すことができる
      request.setAttribute("userId", userId);
      
      return true; // trueを返すと、処理が続行され、Controllerのメソッドが呼ばれる

    } catch (NumberFormatException e) {
      // 5. 数字に変換できない場合はエラー
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
      response.getWriter().write("Invalid X-User-Id header format");
      return false;
    }
  }
}

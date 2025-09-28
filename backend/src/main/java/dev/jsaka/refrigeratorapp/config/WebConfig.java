package dev.jsaka.refrigeratorapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import dev.jsaka.refrigeratorapp.interceptor.UserIdInterceptor;

@Configuration // このクラスが設定用のクラスであることを示す
public class WebConfig implements WebMvcConfigurer {

  private final UserIdInterceptor userIdInterceptor;

  // 作成したInterceptorをDIで受け取る
  public WebConfig(UserIdInterceptor userIdInterceptor) {
    this.userIdInterceptor = userIdInterceptor;
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    // Interceptorを登録する
    registry.addInterceptor(userIdInterceptor)
        .addPathPatterns("/api/foods/**"); // "/api/foods/"で始まる全てのURLに、このInterceptorを適用する
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**") // "/api/"で始まるすべてのパスに適用
        .allowedOrigins("http://localhost:5173") // 許可するフロントエンドのオリジン
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 許可するHTTPメソッド
        .allowedHeaders("*"); // すべてのHTTPヘッダーを許可
    // .allowCredentials(true); // 将来的にCookie認証などが必要な場合はtrueにする
  }
}
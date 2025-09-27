package dev.jsaka.refrigeratorapp.config;

import org.springframework.context.annotation.Configuration;
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
}
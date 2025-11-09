package dev.jsaka.refrigeratorapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // corsの設定(原則ブラウザでは自分の配信場所と異なるAPIを呼び出すことを禁止している)
                // それを許可するためのルールを追加する必要がある
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)

                // 認証フィルターの許可ルールなどを記述
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/**").permitAll() // 許可ルール(apiからのエンドポイント許可)
                        .anyRequest().authenticated() // 上記以外は認証が必要
                )
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/api/**"));
        return http.build();
    }

    // 具体的なcors設定はメソッドとして実装すること
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 許可するフロントエンド
        configuration.setAllowedOrigins(List.of("http://localhost"));

        // 許可するHTTPメソッド
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 許可するHTTPヘッダー
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        // クッキーの許可
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // すべてのパスに対して上記の設定を適用
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
package dev.jsaka.refrigeratorapp.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice // このクラスがアプリケーション全体の例外を処理することを示す
public class GlobalExceptionHandler {

  // ResourceNotFoundExceptionが投げられた時に、このメソッドが呼ばれる
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Object> handleResourceNotFoundException(
      ResourceNotFoundException ex, WebRequest request) {

    // エラーレスポンスのボディを作成
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("status", HttpStatus.NOT_FOUND.value()); // 404
    body.put("error", HttpStatus.NOT_FOUND.getReasonPhrase()); // "Not Found"
    body.put("message", ex.getMessage()); // 例外にセットされたメッセージ
    body.put("path", request.getDescription(false).replace("uri=", "")); // リクエストされたパス

    // ResponseEntityオブジェクトを生成して返す
    return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
  }


  // 上記以外の、予期せぬ全ての例外(Exception.class)をキャッチする
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> handleAllExceptions(
      Exception ex, WebRequest request) {

    // サーバー内部のエラーなので、詳細なメッセージはログに出力する
    ex.printStackTrace();

    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value()); // 500
    body.put("error", HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase()); // "Internal Server Error"
    body.put("message", "An unexpected internal server error occurred"); // ユーザーには汎用的なメッセージを見せる
    body.put("path", request.getDescription(false).replace("uri=", ""));

    return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * @Valid バリデーション違反のハンドリング
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex){

    Map<String, String> errors = new HashMap<>();

    // 例外オブジェクトから、全てのエラー情報を取得し、ループ処理
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            // エラーが発生したフィールド名と、DTOに定義したエラーメッセージを取得
            String fieldName = error.getField();
            String errorMessage = error.getDefaultMessage();
            // Mapに格納
            errors.put(fieldName, errorMessage);
        });

        // 400 Bad Request ステータスで、エラー情報をJSON形式で返す
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
  }
}

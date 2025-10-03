# 冷蔵庫管理アプリ - バックエンド仕様書

## 1. 概要

このアプリケーションは、Web アプリケーション「冷蔵庫管理アプリ」のバックエンドサーバーです。モダンな技術スタック（Java, Spring Boot, MySQL）を基盤とし、フロントエンドアプリケーションに対して食品データを管理するための RESTful API を提供します。
ユーザーごとのデータ分離を実現するため、リクエストヘッダー X-User-Id を用いた簡易的な認証・認可機能を備えています。

## 2. 主な機能

- **RESTful API の提供**
  食品データに対する基本的な CRUD（作成、読み取り、更新、削除）操作を可能にする API エンドポイントを提供します。
- **マルチユーザー対応**
  HandlerInterceptor を利用し、HTTP リクエストヘッダー X-User-Id に基づいて、操作対象のデータをユーザーごとに分離します。
- **データバリデーション**
  spring-boot-starter-validation を利用し、食品登録・更新時にサーバーサイドで入力値の検証（必須項目チェック、文字数制限など）を行います。
- **グローバル例外処理**
  @ControllerAdvice と@ExceptionHandler を用いることで、リソースが見つからない場合(404)やバリデーション違反(400)などのエラー発生時に、統一された JSON 形式でエラーレスポンスを返却します。

## 3. 技術スタック

- **フレームワーク**: Spring Boot 3.x
- **言語**: Java 17
- **データベース**: MySQL 8.0
- **データアクセス**: Spring Data JPA / Hibernate
- **ビルドツール**: Maven
- **その他**: Lombok, Spring Boot Validation

## 4. セットアップと実行方法

- **前提条件**
  JDK 17
  Maven 3.8 以降
  MySQL 8.0

- **手順**
  リポジトリのクローン:

code

```bash
git clone https://your-repository-url.git
cd your-repository-directory
```

- **データベースのセットアップ**:
  MySQL でアプリケーション用のデータベース（例: refrigerator_db）を作成します。
  src/main/resources/application.properties （または.yml）ファイルを開き、自身の環境に合わせてデータベース接続情報を更新します。

code

```Properties
spring.datasource.url=jdbc:mysql://localhost:3306/refrigerator_db?useSSL=false&serverTimezone=Asia/Tokyo
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
```

- **アプリケーション起動時に DB スキーマを自動更新**
  spring.jpa.hibernate.ddl-auto=update

- **アプリケーションのビルド**:
  code

```bash
mvn clean install
```

- **開発サーバーの起動**:
  code

```bash
mvn spring-boot:run
```

サーバーが起動し、デフォルトで http://localhost:8080 で API が利用可能になります。

## 5. API エンドポイント仕様

全ての API リクエストには、操作対象のユーザーを識別するために HTTP ヘッダー X-User-Id: <userId> が必要です。

- **メソッド URL 説明**
  GET /api/foods 指定されたユーザーの食品一覧を取得する。
  GET /api/foods/{id} 指定された ID の食品を一件取得する。
  POST /api/foods 新しい食品を一件登録する。
  PUT /api/foods/{id} 指定された ID の食品情報を更新する。
  DELETE /api/foods/{id} 指定された ID の食品を一件削除する。

- **POST /api/foods**
  説明: 新しい食品を登録します。
  リクエストボディ:
  code

```JSON
{
    "name": "たまご",
    "category": "卵・乳製品",
    "icon": "🥚"
}
```

成功レスポンス: 201 Created と登録された食品オブジェクト。
エラーレスポンス: 400 Bad Request (バリデーション違反時)。

- **PUT /api/foods/{id}**
  説明: 既存の食品情報を更新します。
  リクエストボディ:
  code

```JSON
{
    "name": "とれたてたまご",
    "category": "卵・乳製品",
    "icon": "🥚"
}
```

成功レスポンス: 200 OK と更新された食品オブジェクト。
エラーレスポンス: 400 Bad Request, 404 Not Found。

## 6. アーキテクチャ

本アプリケーションは、関心の分離を目的としたレイヤードアーキテクチャを採用しています。

- **Controller 層**:
  HTTP リクエストのエントリーポイント。リクエストの受付、バリデーションのトリガー(@Valid)、レスポンスの返却を担当します。HTTP に関する責務のみを持ち、ビジネスロジックは含みません。
- **Service 層**:
  アプリケーションのビジネスロジックを実装する中心的な層。複数のリポジトリを組み合わせて複雑な処理を組み立てます。トランザクション管理もこの層で行います。
- **Repository 層**:
  データベースとのデータアクセスを担当する層。Spring Data JPA のインターフェースを利用し、基本的な CRUD 操作やクエリメソッドを定義します。
- **DTO (Data Transfer Object)**:
  レイヤー間、特に Controller とクライアント間でデータをやり取りするための専用オブジェクト。RequestDTO と ResponseDTO を使い分けることで、API 仕様と内部のデータモデル(Entity)を分離し、堅牢性と保守性を高めています。
- **Entity 層**:
  データベースのテーブル構造をマッピングするオブジェクト。JPA のアノテーションを持ちます。

## 7. データベーススキーマ (foods テーブル)

カラム名 データ型 説明
id BIGINT 主キー (自動採番)
user_id BIGINT 食品を所有するユーザーの ID
name VARCHAR 食品名
category VARCHAR 食品のカテゴリ（例: "野菜", "肉"）
icon VARCHAR 食品を表すアイコン（絵文字など）

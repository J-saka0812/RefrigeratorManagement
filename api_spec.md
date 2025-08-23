# 冷蔵庫管理アプリ API仕様（仮）

## 認証
- `POST /api/register` (ユーザー登録)
- `POST /api/login` (ログイン)

## 食品管理
- `GET /api/foods` (食品一覧取得)
  - レスポンス: `[{"id": 1, "name": "牛乳", "expiry_date": "2025-08-30"}, ...]`
- `POST /api/foods` (食品登録)
  - リクエスト: `{"name": "卵", "expiry_date": "2025-09-10"}`
- `PUT /api/foods/{id}` (食品更新)
  - リクエスト: `{"name": "とろけるチーズ", "expiry_date": "2025-09-05"}`
- `DELETE /api/foods/{id}` (食品削除)
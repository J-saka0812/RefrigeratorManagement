## 1. 認証 (Authentication)

### POST /api/auth/login

指定されたメールアドレスでユーザーを認証し、ユーザー情報を返す。
パスワードは使用しない簡易認証。

- **エンドポイント URL:** `POST /api/auth/login`
- **リクエストボディ:**

  ```json
  {
  "id": 1,
  "name": "田中太郎",
  "email": "demo1@example.com"
  }
  {
  "id": 2,
  "name": "田中好子",
  "email": "demo2@example.com"
  }
  {
  "id": 3,
  "name": "KAMA.ちゃん",
  "email": "demo3@example.com"
  }

  ```

## 2. 認証 (Authentication)

### POST /api/auth/register

入力された値でアカウント情報を送信する。

- **エンドポイント URL:** `POST /api/auth/register`
- **リクエストボディ:**

  ```json
  {
    "id": 4,
    "name": "佐藤次郎",
    "email": "demo4@example.com"
  }
  ```

## 3.食品管理

### GET /api/auth/foods

ログイン中のユーザーが登録した食品の一覧を取得する。

- **エンドポイント URL:** `GET /api/foods` (食品一覧取得)
- **レスポンスヘッダー:** -`X-User-Id`: `number` (ログイン時に取得したユーザー ID)

- **成功レスポンス (200 OK):**
  - **レスポンスボディ:** 食品オブジェクトの配列。ユーザーが食品を一件も登録していない場合は空の配列 `[]` を返す。

#### レスポンス例 1: `X-User-Id: 1`

```json
[
  {
    "id": 101,
    "name": "牛乳",
    "category": "乳製品",
    "quantity": 1,
    "unit": "本",
    "expiryDate": "2025-08-30",
    "memo": "開封済み"
  },
  {
    "id": 102,
    "name": "にんじん",
    "category": "野菜",
    "quantity": 1,
    "unit": "パック",
    "expiryDate": "2025-09-10",
    "memo": null
  },
  {
    "id": 103,
    "name": "豚肉",
    "category": "肉類",
    "quantity": 1,
    "unit": "パック",
    "expiryDate": "2025-09-10",
    "memo": null
  },
  {
    "id": 104,
    "name": "さんま",
    "category": "魚類",
    "quantity": 1,
    "unit": "ひき", //ひきの設定がおかしくなるかも
    "expiryDate": "2025-09-10",
    "memo": null
  }
]
```

#### レスポンス例 2: `X-User-Id: 2`

```json
[
  {
    "id": 201,
    "name": "鶏肉",
    "category": "肉類",
    "quantity": 1,
    "unit": "パック",
    "expiryDate": "2025-08-30",
    "memo": "開封済み"
  },
  {
    "id": 202,
    "name": "レタス",
    "category": "野菜",
    "quantity": 1,
    "unit": "玉",
    "expiryDate": "2025-09-10",
    "memo": null
  },
  {
    "id": 203,
    "name": "こんにゃく",
    "category": "その他",
    "quantity": 1,
    "unit": "個",
    "expiryDate": "2025-09-10",
    "memo": null
  },
  {
    "id": 204,
    "name": "キムチ",
    "category": "その他",
    "quantity": 1,
    "unit": "パック",
    "expiryDate": "2025-09-10",
    "memo": null
  }
]
```

#### レスポンス例 3: `X-User-Id: 3`

```json
[
  {
    "id": 301,
    "name": "さけ",
    "category": "魚類",
    "quantity": 1,
    "unit": "ひき",
    "expiryDate": "2025-08-30",
    "memo": "開封済み"
  },
  {
    "id": 302,
    "name": "白菜",
    "category": "野菜",
    "quantity": 1,
    "unit": "玉",
    "expiryDate": "2025-09-10",
    "memo": null
  },
  {
    "id": 303,
    "name": "みりん",
    "category": "調味料",
    "quantity": 1,
    "unit": "本",
    "expiryDate": "2025-09-10",
    "memo": null
  },
  {
    "id": 304,
    "name": "チョコレート",
    "category": "その他",
    "quantity": 1,
    "unit": "個",
    "expiryDate": "2025-09-10",
    "memo": null
  }
]
```

### POST /api/auth/foods

ログイン中のユーザーが新しい食品を登録する。

- **エンドポイント URL:** `POST /api/foods` (食品登録)
  - **リクエストヘッダー:** -`X-User-Id`: `number` (ログイン時に取得したユーザー ID)

  - **リクエストボディ:** 食品オブジェクトを送信。

#### リクエスト例 1: `X-User-Id: 1`

```json
{
  "name": "牛乳",
  "category": "乳製品",
  "quantity": 1,
  "unit": "本",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

#### リクエスト例 2: `X-User-Id: 2`

```json
{
  "name": "牛乳",
  "category": "乳製品",
  "quantity": 1,
  "unit": "本",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

#### リクエスト例 3: `X-User-Id: 3`

```json
{
  "name": "牛乳",
  "category": "乳製品",
  "quantity": 1,
  "unit": "本",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

- **成功レスポンス (201 Created):**
  - **レスポンスボディ:** 登録され、ID が付与された食品情報を返す。

#### レスポンス例 1: `X-User-Id: 1`

```json
{
  "id": 105,
  "name": "キャベツ",
  "category": "野菜",
  "quantity": 3,
  "unit": "玉",
  "expiryDate": "2025-09-15",
  "memo": "サラダ用"
}
```

#### レスポンス例 2: `X-User-Id: 2`

```json
{
  "id": 105,
  "name": "キャベツ",
  "category": "野菜",
  "quantity": 3,
  "unit": "玉",
  "expiryDate": "2025-09-15",
  "memo": "サラダ用"
}
```
#### レスポンス例 3: `X-User-Id: 3`

```json
{
  "id": 105,
  "name": "キャベツ",
  "category": "野菜",
  "quantity": 3,
  "unit": "玉",
  "expiryDate": "2025-09-15",
  "memo": "サラダ用"
}
```


### PUT /api/auth/foods/{id}

ログイン中のユーザーが食品を編集する。

- **エンドポイント URL:** `PUT /api/foods/101` (編集id)
  - **リクエストヘッダー:** -`X-User-Id`: `number` (ログイン時に取得したユーザー ID)

  - **リクエストボディ:** 食品オブジェクトを送信。

#### リクエスト例 1: `X-User-Id: 1`

```json
{
  "name": "チーズ",
  "category": "乳製品",
  "quantity": 1,
  "unit": "個",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

#### リクエスト例 2: `X-User-Id: 2`

```json
{
  "name": "チーズ",
  "category": "乳製品",
  "quantity": 1,
  "unit": "個",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

#### リクエスト例 3: `X-User-Id: 3`

```json
{
  "name": "チーズ",
  "category": "乳製品",
  "quantity": 1,
  "unit": "個",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

- **成功レスポンス (200 OK):**
  - **レスポンスボディ:** 編集された食品情報を返す。

#### レスポンス例 1: `X-User-Id: 1`

```json
{
  "id": 101,
  "name": "ジャガイモ",
  "category": "野菜",
  "quantity": 3,
  "unit": "個",
  "expiryDate": "2025-09-15",
  "memo": "ポテトサラダ用"
}
```

#### レスポンス例 2: `X-User-Id: 2`

```json
{
  "id": 101,
  "name": "ジャガイモ",
  "category": "野菜",
  "quantity": 3,
  "unit": "個",
  "expiryDate": "2025-09-15",
  "memo": "ポテトサラダ用"
}
```
#### レスポンス例 3: `X-User-Id: 3`

```json
{
  "id": 101,
  "name": "ジャガイモ",
  "category": "野菜",
  "quantity": 3,
  "unit": "個",
  "expiryDate": "2025-09-15",
  "memo": "ポテトサラダ用"
}
```

### DELETE /api/auth/foods/{id}

ログイン中のユーザーが食品を削除する。

- **エンドポイント URL:** `DELETE /api/foods/101` (削除id)
  - **リクエストヘッダー:** -`X-User-Id`: `number` (ログイン時に取得したユーザー ID)

  - **リクエストボディ:** 食品オブジェクトを送信。

#### リクエスト例 1: `X-User-Id: 1`

```json
{
  "name": "チーズ",
  "category": "乳製品",
  "quantity": 1,
  "unit": "個",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

#### リクエスト例 2: `X-User-Id: 2`

```json
{
  "name": "チーズ",
  "category": "乳製品",
  "quantity": 1,
  "unit": "個",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

#### リクエスト例 3: `X-User-Id: 3`

```json
{
  "name": "チーズ",
  "category": "乳製品",
  "quantity": 1,
  "unit": "個",
  "expiryDate": "2025-08-30",
  "memo": "開封済み"
}
```

- **成功レスポンス (200 OK):**
  - **レスポンスボディ:** 編集された食品情報を返す。

#### レスポンス例 1: `X-User-Id: 1`

```json
{
  "id": 101,
  "name": "ジャガイモ",
  "category": "野菜",
  "quantity": 3,
  "unit": "個",
  "expiryDate": "2025-09-15",
  "memo": "ポテトサラダ用"
}
```

#### レスポンス例 2: `X-User-Id: 2`

```json
{
  "id": 101,
  "name": "ジャガイモ",
  "category": "野菜",
  "quantity": 3,
  "unit": "個",
  "expiryDate": "2025-09-15",
  "memo": "ポテトサラダ用"
}
```
#### レスポンス例 3: `X-User-Id: 3`

```json
{
  "id": 101,
  "name": "ジャガイモ",
  "category": "野菜",
  "quantity": 3,
  "unit": "個",
  "expiryDate": "2025-09-15",
  "memo": "ポテトサラダ用"
}
```

- `PUT /api/foods/{foodId}` (食品更新)
  - リクエスト: `{"name": "とろけるチーズ", "expiry_date": "2025-09-05"}`
- `DELETE /api/foods/{id}` (食品削除)

```

```

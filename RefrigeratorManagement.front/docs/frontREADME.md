- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


冷蔵庫管理アプリ - 機能仕様書

◆全体概要

技術スタック
: HTML + Tailwind CSS + React.JavaScript（モック段階）
デザイン
: レスポンシブ対応、グラデーション基調の現代的UI
アーキテクチャ
: 単一HTMLファイル内でのポップアップ方式
ホーム画面（食品一覧画面）

◆ ディレクトリ構成
```
C:.
│  .gitignore
│  eslint.config.js
│  index.html
│  jsconfig.json
│  package.json
│  postcss.config.js
│  tailwind.config.js
│  vite.config.js
│
├─docs
│      frontREADME.md
│
├─public
│      vite.svg
│
└─src
    │  App.css
    │  App.jsx
    │  const.js
    │  index.css
    │  main.jsx
    │
    ├─assets
    │      react.svg
    │
    ├─component
    │  │  AddFoodButton.jsx
    │  │  AddFoodModel.jsx
    │  │  CategoryFilter.jsx
    │  │  EditFoodModel.jsx
    │  │  FoodList.jsx
    │  │  FoodListItem.jsx
    │  │  FunctionButton.jsx
    │  │  Header.jsx
    │  │  SearchBar.jsx
    │  │  SearchBarContainer.jsx
    │  │  StatsCard.jsx
    │  │  StatsCards.jsx
    │  │
    │  └─styles
    │          FoodList.module.css
    │          FoodListItem.module.css
    │          StatsCards.module.css
    │
    ├─data
    │      MockFoodData.js
    │      MockUserData.jsx
    └─pages
        │  FoodAdd.jsx
        │  FoodEdit.jsx
        │  Home.jsx
        │  Login.jsx(未実装)
        │
        └─styles
                FoodEdit.module.css
                Login.module.css(未実装)
```

◆ コンポーネント構成と役割

### ◆ 主要コンポーネント
- **`App.jsx`**: アプリケーションの最上位コンポーネント。状態管理（食品データ、フィルター条件）、ルーティング、データ操作関数などを一元管理する司令塔。
- **`main.jsx`**: アプリケーションの起動ファイル（エントリーポイント）。

### ◆ `pages` （画面ごと）
- **`Home.jsx`**: ホーム画面。ヘッダー、統計カード、検索エリア、食品リストなど、各UIセクションを統合して表示するメインページ。
- **`FoodAdd.jsx`**: 食品追加モーダル。新しい食品を登録するためのフォームを提供。
- **`FoodEdit.jsx`**: 食品編集モーダル。既存の食品情報を編集するためのフォームを提供。
- **`Login.jsx`**: ログイン画面（現在はモックアップ）。

### ◆ `component` （部品ごと）
- **`Header.jsx`**: ページ上部に表示されるヘッダー。
- **`StatsCards.jsx`**: 複数の統計情報カードをまとめるコンテナ。
- **`StatsCard.jsx`**: 「総食品数」など、個々の統計情報を表示するカード。
- **`SearchBarContainer.jsx`**: 検索バー、カテゴリフィルター、追加ボタンをまとめるコンテナ。
- **`SearchBar.jsx`**: 食品名で検索するためのテキスト入力欄。
- **`CategoryFilter.jsx`**: カテゴリで食品を絞り込むためのドロップダウンメニュー。
- **`FoodList.jsx`**: 食品一覧を表示するリスト全体のコンテナ。
- **`FoodListItem.jsx`**: 食品リスト内の個々の食品アイテム。
- **`FunctionButton.jsx`**: アプリ内で共通して使われるボタンスタイル。
- **`AddFoodButton.jsx`**: 食品追加モーダルを呼び出すためのボタン（現在は`SearchBarContainer`内のボタンで代替）。

◆ 主な特徴

このアプリケーションは、家庭の冷蔵庫内の食品を効率的に管理することを目的としたWebアプリケーションです。

- **直感的なUI/UX:** グラデーションを基調としたモダンなデザインと、ガラスモーフィズム効果を取り入れたポップアップにより、直感的で心地よい操作感を提供します。
- **リアルタイム在庫管理:** 食品の追加、編集、削除がリアルタイムで一覧に反映されます。賞味期限が近づくと警告が表示され、食品ロスを削減します。
- **強力な検索機能:** 食品名によるリアルタイム検索と、カテゴリによる絞り込みフィルターを組み合わせることで、目的の食品を素早く見つけ出すことができます。
- **コンポーネントベース設計:** Reactを採用し、機能ごとにコンポーネントを分割しています。これにより、メンテナンス性と拡張性の高いコードベースを実現しています。

◆ スクリーンショット                                                                                                                
                                                                                                                                    
### ホーム画面                                                                                                                      
![ホーム画面](images/ホームイメージ.png)                                                                                            
                                                                                                                                    
### 画面遷移図                                                                                                                      
![画面遷移図](images/画面遷移図.png)  

◆統計表示

総食品数の表示
期限切れ間近の食品数（警告表示）
期限切れ食品数（危険表示）
各統計にアイコンとカラーコーディング

◆検索・フィルター機能

リアルタイム食品名検索
カテゴリ別フィルタリング（野菜、肉類、魚類、乳製品、調味料、その他）
検索結果なしの場合の空状態表示
複数条件での絞り込み対応

◆食品管理機能

食品一覧表示（アイコン、名前、カテゴリ、数量、賞味期限）
賞味期限による色分け表示（正常/警告/危険）
編集・削除ボタン付き
ホバーエフェクト

◆食品登録機能（ポップアップ）

右側スライドイン式ポップアップ
必須項目: 食品名、カテゴリ、数量、単位、賞味期限
任意項目: メモ
フォームバリデーション
成功メッセージ表示
キャンセル・登録ボタン

◆食品編集機能（ポップアップ）

登録画面と同様のUI
既存データの自動入力
データベースからの情報取得（モック実装済み）
更新処理と成功メッセージ

◆削除機能

確認ダイアログ付き削除
個別削除対応

◆UI/UX特徴

グラデーション背景とガラスモーフィズム効果
アニメーション付きボタン（ホバー時の浮き上がり効果）
レスポンシブデザイン（モバイル対応）
日本語フォント（Noto Sans JP）使用
直感的なアイコン使用

◆実装機能

・ 登録ポップアップ表示
・ 登録ポップアップ閉じる
・ 食品登録処理
・ 編集ポップアップ表示・データ設定
・ 編集ポップアップ閉じる
・ 食品更新処理
・ 削除処理
・ 検索・フィルター処理

◆データ構造（モック）
{
  name: '食品名',
  category: 'カテゴリ',
  quantity: 数量,
  unit: '単位',
  expiryDate: '賞味期限',
  memo: 'メモ'
  icon: 'カテゴリアイコン'
}

◆今後の拡張予定

DBでのデータ永続化→RDS運用も検討
Javaを使用してDB通信
Dockerでコンテナ管理
AWSを使用してEC2、もしくはECSで運用

◆React移行時の設計方針

コンポーネント分割
: 
アプリケーションを以下の主要コンポーネントに分割。
- **Pages**: `Home`, `FoodAdd`, `FoodEdit` など画面単位のコンポーネント。
- **Components**: 画面を構成する部品単位のコンポーネント。
  - `Header`: ヘッダー
  - `StatsCards`: 統計情報カード群
  - `SearchBarContainer`: 検索エリア
  - `FoodList`: 食品一覧
  - `FunctionButton`: 共通ボタン
状態管理
: 
`App.jsx` を最上位コンポーネントとし、`useState` を用いて食品データ、フィルター条件、モーダルの表示状態などを一元管理。各コンポーネントには必要なデータと関数をPropsとして渡す。
API連携
: (現状はモックデータ) 将来的にはカスタムフック (`useFoodApi`など) を作成し、バックエンドAPIとのデータ通信（CRUD操作）を抽象化する方針。
エラーハンドリング
: API連携時にローディング状態とエラー状態を管理し、UIにフィードバックする。
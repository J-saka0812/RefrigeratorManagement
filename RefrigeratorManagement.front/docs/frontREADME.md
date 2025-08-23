# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


冷蔵庫管理アプリ - 機能仕様書

📋 全体概要

技術スタック
: HTML + Tailwind CSS + JavaScript（モック段階）
デザイン
: レスポンシブ対応、グラデーション基調の現代的UI
アーキテクチャ
: 単一HTMLファイル内でのポップアップ方式
🏠 ホーム画面（食品一覧画面）

基本情報

ファイル
: メインHTML（食品一覧 + 登録・編集ポップアップ）
レイアウト
: ヘッダー + 統計カード + 検索エリア + 食品リスト
搭載機能

📊 統計表示

総食品数の表示
期限切れ間近の食品数（警告表示）
期限切れ食品数（危険表示）
各統計にアイコンとカラーコーディング
🔍 検索・フィルター機能

リアルタイム食品名検索
カテゴリ別フィルタリング（野菜、肉類、魚類、乳製品、調味料、その他）
検索結果なしの場合の空状態表示
複数条件での絞り込み対応
📝 食品管理機能

食品一覧表示（アイコン、名前、カテゴリ、数量、賞味期限）
賞味期限による色分け表示（正常/警告/危険）
編集・削除ボタン付き
ホバーエフェクト
➕ 食品登録機能（ポップアップ）

右側スライドイン式ポップアップ
必須項目: 食品名、カテゴリ、数量、単位、賞味期限
任意項目: メモ
フォームバリデーション
成功メッセージ表示
キャンセル・登録ボタン
✏️ 食品編集機能（ポップアップ）

登録画面と同様のUI（青系カラーで区別）
既存データの自動入力
データベースからの情報取得（モック実装済み）
更新処理と成功メッセージ
🗑️ 削除機能

確認ダイアログ付き削除
個別削除対応
UI/UX特徴

グラデーション背景とガラスモーフィズム効果
アニメーション付きボタン（ホバー時の浮き上がり効果）
レスポンシブデザイン（モバイル対応）
日本語フォント（Noto Sans JP）使用
直感的なアイコン使用
技術実装詳細

JavaScript関数
:
goToAddFood()
 - 登録ポップアップ表示
closeAddFoodPopup()
 - 登録ポップアップ閉じる
submitAddFood()
 - 食品登録処理
editFood(foodId)
 - 編集ポップアップ表示・データ設定
closeEditFoodPopup()
 - 編集ポップアップ閉じる
submitEditFood()
 - 食品更新処理
deleteFood(foodId)
 - 削除処理
filterFoods()
 - 検索・フィルター処理
データ構造（モック）
:
{
  name: '食品名',
  category: 'カテゴリ',
  quantity: 数量,
  unit: '単位',
  expiryDate: '賞味期限',
  memo: 'メモ'
}

今後の拡張予定

ローカルストレージでのデータ永続化
一括削除機能
ソート機能（賞味期限順、名前順など）
食品画像アップロード機能
バーコードスキャン機能
🚀 React移行時の設計方針

コンポーネント分割
: 
FoodList
, 
AddFoodModal
, 
EditFoodModal
, 
SearchBar
, 
StatsCards
状態管理
: 
useState
でポップアップ表示、食品データ、フォーム状態を管理
API連携
: カスタムフックでCRUD操作を抽象化
エラーハンドリング
: ローディング状態とエラー状態の適切な管理
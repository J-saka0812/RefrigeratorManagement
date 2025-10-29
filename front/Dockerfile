# --- ステージ1: ビルド環境 (Reactアプリケーション) ---
FROM node:18 AS builder

WORKDIR /app

# package.jsonとyarn.lockをコピーして依存関係をインストール
COPY package*.json ./
RUN yarn install

# ソースコードをコピーしてビルド
COPY . .
RUN yarn build

# --- ステージ2: 実行環境 (Nginxで静的ファイルを配信) ---
FROM nginx:alpine

# ビルドステージで生成された静的ファイルをNginxのWebルートにコピー
COPY --from=builder /app/build /usr/share/nginx/html

# Nginxがデフォルトで使用するポート80を公開
EXPOSE 80

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
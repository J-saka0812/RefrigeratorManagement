# --- ステージ1: ビルド環境 (Reactアプリケーション) ---
FROM node:18 AS builder

WORKDIR /app

# package.jsonだけでなく、プロジェクトの全ファイルを先にコピー
COPY . .

#corepackの起動も含める
RUN corepack enable && yarn install

RUN yarn build

# --- ステージ2: 実行環境 (Nginxで静的ファイルを配信) ---
FROM nginx:alpine

# プロジェクト内のnginx.confを、コンテナ内のNginx設定ディレクトリにコピーする
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# ビルドステージで生成された静的ファイルをNginxのWebルートにコピー
COPY --from=builder /app /usr/share/nginx/html

# Nginxがデフォルトで使用するポート80を公開
EXPOSE 80

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
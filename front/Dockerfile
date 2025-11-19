# --- ステージ1: ビルド環境 (Reactアプリケーション) ---
FROM node:18 AS builder

WORKDIR /app

# package.jsonだけでなく、プロジェクトの全ファイルを先にコピー
COPY . .

#corepackの起動も含める
RUN corepack enable && yarn install

RUN yarn build

# --- ステージ2: 実行環境 (Nginxで静的ファイルを配信) ---
# 軽量版のalpineから標準版に変更
FROM nginx:1.27-bookworm 

# netcatのインストール
# RUN apt-get update && apt-get install -y --no-install-recommends netcat && rm -rf /var/lib/apt/lists/*
# プロジェクト内のnginx.confを、コンテナ内のNginx設定ディレクトリにコピーする
COPY ./nginx.conf /etc/nginx/nginx.conf
# ビルドステージで生成された静的ファイルをNginxのWebルートにコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginxがデフォルトで使用するポート80を公開
EXPOSE 80

# バックエンドの起動待機
# COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
# RUN chmod +x /usr/local/bin/wait-for-it.sh

# バックエンド(app:8080)が立ち上がるまで待機してから nginx 起動
# ENTRYPOINT ["wait-for-it.sh", "app", "8080", "--", "nginx", "-g", "daemon off;"]

CMD ["nginx", "-g", "daemon off;"]
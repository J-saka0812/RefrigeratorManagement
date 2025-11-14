#!/bin/bash


# 手順1はマイグレーション時削除するように

# --- 1. 初期クリーンアップ ---
echo "--- 1. 既存のコンテナとボリュームを完全に停止・削除します ---"
# Ctrl+Cで停止したコンテナや、以前のビルドで残ったボリュームを削除
docker compose -f docker-compose.yml -f docker-compose.prod.yml down --volumes

# 不要なビルドキャッシュ、未使用のイメージ、ネットワークなどを一掃し、ディスクスペースを確保
echo "--- 2. 不要なビルドキャッシュと未使用リソースを一掃します ---"
docker system prune -a -f

# --- 2. 依存関係のビルド（メモリ消費対策） ---

# バックエンド (app) を分離してビルド
echo "--- 3. バックエンド (app) サービスをビルドします ---"
docker compose -f docker-compose.yml -f docker-compose.prod.yml build app

# フロントエンド (frontend) を分離してビルド
echo "--- 4. フロントエンド (frontend) サービスをビルドします ---"
docker compose -f docker-compose.yml -f docker-compose.prod.yml build frontend

# --- 3. クリーンな環境でのコンテナ起動 ---

# ビルドが成功したイメージを使用して、コンテナをバックグラウンドで起動
# --no-build を指定することで、ビルドステップをスキップし、時間短縮と安定化を図ります。
echo "--- 5. ビルド済みのイメージでコンテナを起動します (バックグラウンド) ---"
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-build

echo "--- 完了 ---"
echo "すべてのリソースがクリーンアップされ、コンテナが起動しました。"
echo "コンテナの状態を確認するには 'docker compose ps' を実行してください。"


# 実行は以下を使用
# chmod +x build_and_run.sh
# 3.  スクリプトを実行します。
# ```bash
# ./build_and_run.sh
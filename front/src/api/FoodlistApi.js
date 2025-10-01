import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchFoods = async (userId) => {
  if (!userId) {
    console.error("ユーザーIDが指定されていません。");
    return []; // ユーザーIDがない場合は空の配列を返す
  }

  try {
    // バックエンドのAPIエンドポイントにGETリクエストを送信
    const res = await axios.get(`${API_BASE_URL}/foods`, {
      headers: {
        // マルチユーザー対応のために、どのユーザーとして操作するかをヘッダーで指定
        "X-User-Id": userId,
      },
    });

    return res.data;
  } catch (error) {
    console.error("食品データの取得に失敗しました", error);
    return []; // エラーが発生した場合は空の配列を返す
  }
};

/**
 * 新しい食品を登録する
 * @param {object} foodData - 登録する食品のデータ
 */
export const createFood = (foodData, userId) => {
  return axios.post(`${API_BASE_URL}/foods`, foodData, {
    headers: { 'X-User-Id': userId },
  });
};

/**
 * 既存の食品を削除する
 * @param {number | string} foodId - 削除する食品のID
 * @param {string} userId
 */
export const deleteFood = (foodId, userId) => {
  return axios.delete(`${API_BASE_URL}/foods/${foodId}`,{
    headers: {'X-User-Id': userId},
  });
};

/**
 * 既存の食品を更新
 * @param {number | string} foodId - 更新する食品のID
 * @param {object} foodData - 更新する食品のデータ
 * @param {string} userId
 */
export const editFood = (foodId, foodData, userId) => {
  return axios.put(`${API_BASE_URL}/foods/${foodId}`, foodData, {
    headers: {'X-User-Id': userId},
  });
};
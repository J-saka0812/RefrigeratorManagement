import axios from "axios";

export const fetchFoods = async (userId) => {
  if (!userId) {
    console.error("ユーザーIDが指定されていません。");
    return []; // ユーザーIDがない場合は空の配列を返す
  }

  try {
    // バックエンドのAPIエンドポイントにGETリクエストを送信
    const res = await axios.get("http://localhost:8080/api/foods", {
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
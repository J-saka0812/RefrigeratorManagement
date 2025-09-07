import { useEffect, useState } from "react";
import classes from "./styles/FoodEdit.module.css"; // CSSモジュールをインポート
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryFilter } from "component/CategoryFilter";

export function FoodEdit({ onEdit }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { food } = location.state || {};
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    icon: "", // アイコン情報を保持するフィールドを追加
    category: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    memo: "",
  });

  useEffect(() => {
    if (food) {
      setFormData({
        id: food.id,
        name: food.name || "",
        icon: food.icon || "",
        category: food.category || "",
        quantity: food.quantity || "",
        unit: food.unit || "",
        expiryDate: food.expiryDate
          ? new Date(food.expiryDate).toISOString().split("T")[0]
          : "",
        memo: food.memo || "",
      });
    }
    // わずかな遅延を入れてから表示アニメーションを開始
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [food]);

  const handleInputChange = (event) => {
    // ここでのevent.target.nameはすべてのinputに割り当てられているname属性の中身("name"や"category")
    // そこに入力した内容value(formDataのname: やcategory: に入っている値)
    // setFormDataはFoodEditに遷移したときにfoodとしてstateで渡されているのでそこに入っていた値
    const { name, value } = event.target;
    const today = new Date().toISOString().split()
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitEditFood = (event) => {
    event.preventDefault();
    
    onEdit(formData); // App.jsxのhandleEditFoodを呼び出す
    setIsVisible(false); // 閉じるアニメーションを開始
    setTimeout(() => navigate(-1), 300); // アニメーション後に遷移
  };

  const handleCancel = () => {
    setIsVisible(false); // 閉じるアニメーションを開始
    setTimeout(() => navigate(-1), 300); // アニメーション後に遷移
  };

  if (!food) {
    // food データがない場合はエラーメッセージなどを表示
    return <div>食品データが見つかりません。</div>;
  }

  return (
    <div>
      <div id="editFoodPopup" className={classes.popupOverlay}>
        <div className={`${classes.popupContent} ${isVisible ? classes.visible : ""}`}>
          {/* ヘッダー */}
          <div className={classes.header}>
            <div className={classes.headerTitleGroup}>
              <div className={classes.headerIcon}>
                <span>✏️</span>
              </div>
              <h2 className={classes.headerTitle}>食品を編集</h2>
            </div>
            <button onClick={handleCancel} className={classes.closeButton}>
              <span>✕</span>
            </button>
          </div>

          {/* フォーム */}
          <form id="editFoodForm" onSubmit={submitEditFood} className={classes.form}>
            {/* 食品名 */}
            <div>
              <label htmlFor="editFoodName" className={classes.formLabel}>
                食品名 <span className={classes.requiredMark}>*</span>
              </label>
              <input
                type="text"
                id="editFoodName"
                name="name"
                className={classes.formInput}
                placeholder="例: にんじん"
                required
                pattern=".*[A-Za-zぁ-んァ-ヶ一-龥].*"
                title="文字を1文字以上含めてください"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* カテゴリ */}
            <div>
              <label htmlFor="editCategory" className={classes.formLabel}>
                カテゴリ <span className={classes.requiredMark}>*</span>
              </label>
              {/* TODO: カテゴリフィルターのコンポーネントを、流用できるように修正 */}
              {/* <CategoryFilter
              value={formData.category}
              onChange={handleInputChange}
              className={classes.formSelect}
              /> */}
              <select
                id="editCategory"
                name="category"
                className={classes.formSelect}
                required
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">カテゴリを選択</option>
                <option value="野菜">🥬 野菜</option>
                <option value="肉類">🍗 肉類</option>
                <option value="魚類">🐟 魚類</option>
                <option value="乳製品">🥛 乳製品</option>
                <option value="調味料">🧂 調味料</option>
                <option value="その他">📦 その他</option>
              </select>
            </div>

{/* TODO: 数量と単位をコンポーネント化 */}
            {/* 数量と単位 */}
            <div className={classes.inputGrid}>
              <div>
                <label htmlFor="editQuantity" className={classes.formLabel}>
                  数量 <span className={classes.requiredMark}>*</span>
                </label>
                <input
                  type="number"
                  id="editQuantity"
                  name="quantity"
                  min="0.5"
                  step="0.5"
                  className={classes.formInput}
                  placeholder="1"
                  required
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="editUnit" className={classes.formLabel}>
                  単位 <span className={classes.requiredMark}>*</span>
                </label>
                <select
                  id="editUnit"
                  name="unit"
                  className={classes.formSelect}
                  required
                  value={formData.unit}
                  onChange={handleInputChange}
                >
                  <option value="">単位を選択</option>
                  <option value="個">個</option>
                  <option value="本">本</option>
                  <option value="玉">玉</option>
                  <option value="袋">袋</option>
                  <option value="パック">パック</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
                </select>
              </div>
            </div>

            {/* 賞味期限 */}
            <div>
              <label htmlFor="editExpiryDate" className={classes.formLabel}>
                賞味期限 <span className={classes.requiredMark}>*</span>
              </label>
              <input
                type="date"
                id="editExpiryDate"
                name="expiryDate"
                className={classes.formInput}
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>

            {/* メモ */}
            <div>
              <label htmlFor="editMemo" className={classes.formLabel}>
                メモ（任意）
              </label>
              <textarea
                id="editMemo"
                name="memo"
                rows="3"
                className={classes.formTextarea}
                placeholder="保存場所や特記事項など..."
                value={formData.memo}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* ボタン */}
            <div className={classes.buttonGroup}>
              <button
                type="button"
                onClick={handleCancel}
                className={`${classes.button} ${classes.buttonCancel}`}
              >
                キャンセル
              </button>
              <button type="submit" className={`${classes.button} ${classes.buttonSubmit}`}>
                更新する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

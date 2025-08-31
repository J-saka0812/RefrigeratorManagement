import { useEffect, useState } from "react";
import classes from "./styles/FoodEdit.module.css"; // CSSモジュールをインポート
import { useNavigate } from "react-router-dom";

export function FoodAdd({ onAdd }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    memo: "",
    icon: "",
  });

  useEffect(() => {
    // わずかな遅延を入れてから表示アニメーションを開始
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitAddFood = (event) => {
    event.preventDefault();
    onAdd(formData);
    setIsVisible(false);
    setTimeout(() => navigate(-1), 300);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => navigate(-1), 300);
  };

  return (
    <div>
      <div id="addFoodPopup" className={classes.popupOverlay}>
        <div className={`${classes.popupContent} ${isVisible ? classes.visible : ""}`}>
          <div className={classes.header}>
            <div className={classes.headerTitleGroup}>
              <div className={classes.headerIcon}>
                <span>➕</span>
              </div>
              <h2 className={classes.headerTitle}>食品を追加</h2>
            </div>
            <button onClick={handleCancel} className={classes.closeButton}>
              <span>✕</span>
            </button>
          </div>

          <form id="addFoodForm" onSubmit={submitAddFood} className={classes.form}>
            {/* 食品名 */}
            <div>
              <label htmlFor="addFoodName" className={classes.formLabel}>
                食品名 <span className={classes.requiredMark}>*</span>
              </label>
              <input
                type="text"
                id="addFoodName"
                name="name"
                className={classes.formInput}
                placeholder="例: にんじん"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* カテゴリ */}
            <div>
              <label htmlFor="addCategory" className={classes.formLabel}>
                カテゴリ <span className={classes.requiredMark}>*</span>
              </label>
              <select
                id="addCategory"
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

            {/* 数量と単位 */}
            <div className={classes.inputGrid}>
              <div>
                <label htmlFor="addQuantity" className={classes.formLabel}>
                  数量 <span className={classes.requiredMark}>*</span>
                </label>
                <input
                  type="number"
                  id="addQuantity"
                  name="quantity"
                  min="0.1"
                  step="0.1"
                  className={classes.formInput}
                  placeholder="1"
                  required
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="addUnit" className={classes.formLabel}>
                  単位 <span className={classes.requiredMark}>*</span>
                </label>
                <select
                  id="addUnit"
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
              <label htmlFor="addExpiryDate" className={classes.formLabel}>
                賞味期限 <span className={classes.requiredMark}>*</span>
              </label>
              <input
                type="date"
                id="addExpiryDate"
                name="expiryDate"
                className={classes.formInput}
                required
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>

            {/* メモ */}
            <div>
              <label htmlFor="addMemo" className={classes.formLabel}>
                メモ（任意）
              </label>
              <textarea
                id="addMemo"
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
                追加する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

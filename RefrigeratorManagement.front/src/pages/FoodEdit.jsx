import { useEffect, useState } from "react";
import classes from "./styles/FoodEdit.module.css"; // CSSモジュールをインポート
import { useLocation, useNavigate } from "react-router-dom";
import { FunctionButton } from "component/FunctionButton";
import { ROUTES } from "../const";

export function FoodEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const { food } = location.state || {};
  const [isShown, setIsShown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    memo: "",
  });

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name || "",
        category: food.category || "",
        quantity: food.quantity || "",
        unit: food.unit || "",
        expiryDate: food.expiryDate
          ? new Date(food.expiryDate).toISOString().split("T")[0]
          : "",
        memo: food.memo || "",
      });
    }
    setIsVisible(true);
  }, [food]);

  const handleInputChange = (event) => {
    // ここでのevent.target.nameはすべてのinputに割り当てられているname属性の中身("name"や"category")
    // そこに入力した内容value(formDataのname: やcategory: に入っている値)
    // setFormDataはFoodEditに遷移したときにfoodとしてstateで渡されているのでそこに入っていた値
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitEditFood = (event) => {
    event.preventDefault();
    // フォーム送信ロジック
    console.log("Updated Food Data:", formData);
    setIsShown(true);
  };

  useEffect(() => {
    if (isShown) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => navigate(ROUTES.HOME), 300); // Animation duration
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isShown, navigate]);

  const handleCancel = () => {
    // navigate(-1) → ブラウザの「戻る」と同じ
    // キャンセルボタンが押されたら前の画面に戻す
    setIsVisible(false);
    setTimeout(() => navigate(-1), 300); // Animation duration
  };

  if (!food) {
    // food データがない場合はエラーメッセージなどを表示
    return <div>食品データが見つかりません。</div>;
  }

  return (
    <div>
      <div id="editFoodPopup" className={classes.popupOverlay}>
        <div className={`${classes.popupContent} ${isVisible ? classes.visible : ""}`}>
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

          <form
            id="editFoodForm"
            onSubmit={submitEditFood}
            className={classes.form}
          >
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
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="editCategory" className={classes.formLabel}>
                カテゴリ <span className={classes.requiredMark}>*</span>
              </label>
              <select
                id="editCategory"
                name="category"
                className={classes.formSelect}
                required
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">カテゴリを選択</option>
                <option value="野菜">🥕 野菜</option>
                <option value="肉類">🍗 肉類</option>
                <option value="魚類">🐟 魚類</option>
                <option value="乳製品">🥛 乳製品</option>
                <option value="調味料">🧂 調味料</option>
                <option value="その他">📦 その他</option>
              </select>
            </div>

            <div className={classes.inputGrid}>
              <div>
                <label htmlFor="editQuantity" className={classes.formLabel}>
                  数量 <span className={classes.requiredMark}>*</span>
                </label>
                <input
                  type="number"
                  id="editQuantity"
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
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>

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

            {isShown && (
              <div id="editSuccessMessage" className={classes.successMessage}>
                <span>✅</span>
                <span>食品を更新しました！</span>
              </div>
            )}

            <div className={classes.buttonGroup}>
              <FunctionButton
                type="button"
                onClick={handleCancel}
                className={`${classes.button} ${classes.buttonCancel}`}
              >
                キャンセル
              </FunctionButton>
              <FunctionButton
                type="submit"
                onClick={submitEditFood}
                className={`${classes.button} ${classes.buttonSubmit}`}
              >
                更新する
              </FunctionButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { FunctionButton } from "./FunctionButton";
import classes from "./styles/FoodListItem.module.css";

export function FoodListItem({ food, onEdit, onDelete }) {
  
  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    // 時刻をリセットして日付のみで比較
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(food.expiryDate);

  return (
    <div>
      <div
        className="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item"
        data-category={food.category}
        data-name={food.name}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-pink-200 to-rose-300 w-16 h-16 rounded-full flex items-center justify-center shadow-md">
              <span className="text-3xl">{food.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {food.name}
              </h3>
              <p className="text-sm text-gray-600">{food.category}</p>
              <p className="text-sm text-gray-600">
                {food.quantity}
                {food.unit}
              </p>
              <p className="text-sm text-green-600 font-medium">
                {`賞味期限: ${food.expiryDate} (あと ${daysLeft}日)`}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <FunctionButton
              type="button"
              onClick={() => {
                onEdit(food.id);
              }}
              className={classes.editButton}
            >
              編集
            </FunctionButton>
            <FunctionButton
              type="button"
              onClick={() => {
                onDelete(food.id);
              }}
              className={classes.deleteButton}
            >
              削除
            </FunctionButton>
          </div>
        </div>
      </div>
    </div>
  );
}

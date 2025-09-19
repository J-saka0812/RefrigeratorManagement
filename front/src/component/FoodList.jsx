import classes from "./styles/FoodList.module.css";
import { FoodListItem } from "./FoodListItem";

export function FoodList({ foods, onEdit, onDelete }) {

  if (!Array.isArray(foods) || foods.length === 0) {
    return (
      <div className={classes.foodListContainer}>
        <div className={classes.lotLine}>
          <h2 className={classes.listText}>食品一覧</h2>
        </div>
        <div className={classes.itemContainer}>
          <p>表示する食品がありません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.foodListContainer}>
      <div className={classes.lotLine}>
        <h2 className={classes.listText}>食品一覧</h2>
      </div>

      <div id="foodList" className={classes.itemContainer}>
        {/* <!-- 食品アイテム1 --> */}
        {/* <FoodListItem food={foods} onEdit={onEdit} onDelete={onDelete} /> */}
        {foods.map((food) => (
          <FoodListItem key={food.id} food={food} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

import { menuItemsList } from "../../../utils/data.type";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BurgerIngredientsCategoryItem } from "./category-item/category-item";
import PropTypes from "prop-types";
import style from "./burger-ingredients-catogory.module.css";

export function BurgerIngredientsCategory({ title, items }) {

  const { selectedIds } = useSelector(store => ({
    selectedIds: store.burgerConstructor.burgerSet,
  }));

  const counters = useMemo(() => {
    return (selectedIds || []).reduce((memo, item) => {
      memo[item._id] = memo[item._id] ? memo[item._id] + 1 : 1;
      return memo;
    }, {});
  }, [selectedIds]);

  return (
    <div>
      <p className="text text_type_main-medium">{title}</p>
      <ul key={title + '-ul'} className={`p-0 m-0 pt-3 ${style.list}`}>
        {items.map((item, index) => {
          return (<BurgerIngredientsCategoryItem
            key={title + '-' + item._id}
            count={counters[item._id]}
            item={item}
            index={index}
          />);
        })}
      </ul>
    </div>
  );
};

BurgerIngredientsCategory.propTypes = {
  title: PropTypes.string,
  items: menuItemsList,
};

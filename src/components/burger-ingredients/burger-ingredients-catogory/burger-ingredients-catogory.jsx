import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsList } from "../../../utils/data.type";
import { useCallback, useMemo } from "react";
import { SET_CURRENT_INGRIDIENT } from "../../../services/actions/ingridients";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { menuItem } from "../../../utils/data.type";
import PropTypes from "prop-types";
import style from "./burger-ingredients-catogory.module.css";

export function BurgerIngredientsCategory({ title, items }) {

  const { selectedIds } = useSelector(store => ({
    selectedIds: store.constructor.burgerSet,
  }));

  const counters = useMemo(() => {
    return (selectedIds || []).reduce((memo, id) => {
      memo[id] = memo[id] ? memo[id] + 1 : 1;
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

const BurgerIngredientsCategoryItem = ({ item, count, index }) => {

  const dispatch = useDispatch();

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'toBurgerSet',
    item: () => {
      return { item, index: -1 };
    },
  }));

  const clickIngridientHandler = useCallback((ingridient) => {
    dispatch({ type: SET_CURRENT_INGRIDIENT, payload: ingridient });
  });

  return (<li
    ref={drag}
    onClick={() => clickIngridientHandler(item)}
    className={`m-3 ml-2 mb-8 ${style.item}`}
    key={item._id + '_' + index}
  >
    <div className={style.image}>
      <img src={item.image} alt={item.name} />
    </div>
    <p className={`text text_type_digits-default m-1`}>
      {item.price} &nbsp; <CurrencyIcon type="primary" />
    </p>
    <p className={`text text_type_main-default ${style.name}`}>
      {item.name}
    </p>
    {count && (<Counter count={count} size="default" extraClass="m-1" />)}
  </li>);
}

BurgerIngredientsCategoryItem.propTypes = {
  item: menuItem,
  count: PropTypes.number,
  index: PropTypes.number,
};

import { IMenuItem } from "../../../utils/data.type";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { BurgerIngredientsCategoryItem } from "./category-item/category-item";
import PropTypes from "prop-types";
import style from "./burger-ingredients-catogory.module.css";
import { RootState } from "../../..";


interface ICompProps {
  title: string;
  items: Array<IMenuItem>;
}

export const BurgerIngredientsCategory: FC<ICompProps> = ({ title, items }) => {

  const { selectedIds, bunId } = useSelector((store: RootState) => ({
    selectedIds: store.constructer.burgerSet,
    bunId: store.constructer.bun,
  }));

  const counters = useMemo(() => {
    const initCounter = bunId ? { [bunId]: 2 } : {};
    return (selectedIds || []).reduce((memo, item) => {
      memo[item._id] = memo[item._id] ? memo[item._id] + 1 : 1;
      return memo;
    }, initCounter);
  }, [selectedIds, bunId]);

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

// BurgerIngredientsCategory.propTypes = {
//   title: PropTypes.string,
//   items: menuItemsList,
// };

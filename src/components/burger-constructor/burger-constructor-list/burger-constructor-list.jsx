import { useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { menuItem } from "../../../utils/data.type";
import { IngredientsListCenter } from "./ingredients-list-center/ingredients-list-center";
import { IngredientsListItem } from "./ingredients-list-center/ingredients-list-item/ingredients-list-item";
import { BunComponent } from "./bun-component/bun-component";
import style from "./burger-constructor-list.module.css";


export const TopBottomWords = {
  bottom: 'низ',
  top: 'верх',
};

export function BurgerConstructorList() {

  const { constructorState, ingridients, bun } = useSelector(store => ({
    ingridients: store.ingredients.items,
    categories: store.ingredients.categories,
    constructorState: store.constructor,
    bun: store.constructor.bun,
  }));

  console.log('constructorState.burgerSet: ', constructorState.burgerSet);

  // const items = useMemo(() => {
  //   if (constructorState.burgerSet) {
  //     return constructorState.burgerSet.map(itemId => {
  //       return ingridients.find(ingridient => ingridient._id == itemId);
  //     });
  //   }
  //   return [];
  // }, [constructorState.burgerSet]);

  const bunItem = useMemo(() => {
    return ingridients.find(_ingredient => _ingredient._id == bun);
  }, [bun]);

  return (
    <div className={`${style.wrapper} pt-25`}>
      <div key={bunItem?._id + '_top'} className={`${style.item} pr-5 pb-0`}>
        <BunComponent bunItem={bunItem} insIndex={0} type="top" />
      </div>
      <IngredientsListCenter items={constructorState.burgerSet} />
      <div key={bunItem?._id + '_bot'} className={`${style.item} pr-5 pb-4`}>
        <BunComponent bunItem={bunItem} insIndex={constructorState.burgerSet.length - 1} type="bottom" />
      </div>
    </div>
  );
};

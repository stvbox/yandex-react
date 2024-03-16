import { useState, useCallback } from "react";
import IngridientInfo from "../../burger-constructor/ingridient-details/ingridient-details";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { menuItemsList } from "../../../utils/data.type";
import style from "./ingridients-list.module.css";
import img from "../../../images/bfdc4078671aa80fd62e384c5d707e3a.png";

const IngredientsList = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(null);

  const closeHandler = useCallback((e) => {
    setCurrentItem(null);
  }, []);

  const clickIngridientHandler = useCallback((ingridient) => {
    //console.log(JSON.stringify(ingridient));
    setCurrentItem(ingridient);
  });

  return (
    <>
      <div className={`${style.wrapper} pt-25`}>
        <div className={`${style.item} pr-5 pb-0`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <ul className={`scroll-box ${style.list} mt-0 mb-0`}>
          {items.map((item) => {
            return (
              <li
                onClick={() => clickIngridientHandler(item)}
                className={`${style.item} pr-3 pb-4`}
                key={item._id}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </ul>
        <div className={`${style.item} pr-5 pb-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
        {currentItem && (
          <IngridientInfo
            ingridient={currentItem}
            closeHandler={closeHandler}
          />
        )}
      </div>
    </>
  );
};

IngredientsList.propTypes = {
  items: menuItemsList,
};

export default IngredientsList;

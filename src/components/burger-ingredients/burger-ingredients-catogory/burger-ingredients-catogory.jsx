import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import IngridientInfo from "../ingridient-details/ingridient-details";
import PropTypes from "prop-types";
import style from "./burger-ingredients-catogory.module.css";
import { menuItemsList } from "../../../utils/data.type";
import { useCallback, useState } from "react";

function BurgerIngredientsCategory({ title, items }) {
  const [currentItem, setCurrentItem] = useState(null);

  const closeHandler = useCallback((e) => {
    setCurrentItem(null);
  }, []);

  const clickIngridientHandler = useCallback((ingridient) => {
    setCurrentItem(ingridient);
  });

  return (
    <>
      <p className="text text_type_main-medium">{title}</p>
      <ul className={`p-0 m-0 pt-3 ${style.list}`}>
        {items.map((item) => {
          return (
            <li
              onClick={() => clickIngridientHandler(item)}
              className={`m-3 ml-2 mb-8 ${style.item}`}
              key={item._id}
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
              <Counter count={item.fat} size="default" extraClass="m-1" />
            </li>
          );
        })}
      </ul>
      {currentItem && (
        <Modal title="Детали ингредиента" closeHandler={closeHandler}>
          <IngridientInfo
            ingridient={currentItem}
            closeHandler={closeHandler}
          />
        </Modal>
      )}
    </>
  );
};

BurgerIngredientsCategory.propTypes = {
  title: PropTypes.string,
  items: menuItemsList,
};

export default BurgerIngredientsCategory;

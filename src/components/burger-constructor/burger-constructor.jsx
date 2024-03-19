import { useCallback, useState, useContext } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SelectedIngredientsContext, IngredientsContext } from "../../services/ingredientsContext";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { menuItemsCategories } from "../../utils/data.type";
import IngredientsList from "./ingridients-list/ingridients-list";
import style from "./burger-constructor.module.css";

function BurgerConstructor() {
  const { constructorState, constructorDispatcher } = useContext(SelectedIngredientsContext);

  const [isSent, setSent] = useState(false);

  const closeHandler = useCallback((e) => {
    setSent(false);
    constructorDispatcher({ type: 'random' });
  }, []);

  const checkoutOrderHandler = useCallback(() => {
    setSent(true);
  });

  return (
    <>
      <IngredientsList items={constructorState.ingredients} />
      <div className={`${style.footer} mt-10 mb-10 pr-4`}>
        <p className={`text text_type_digits-medium ${style.price} mr-10`}>
          {constructorState.cast} &nbsp; <CurrencyIcon type="primary" />
        </p>
        <Button
          onClick={checkoutOrderHandler}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {/* -- BurgerIngredients */}
      {isSent && (
        <Modal title="" closeHandler={closeHandler}>
          <OrderDetails closeHandler={closeHandler} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  categories: menuItemsCategories,
};

export default BurgerConstructor;

import { useCallback, useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { menuItemsCategories } from "../../utils/data.type";
import IngredientsList from "./ingridients-list/ingridients-list";
import style from "./burger-constructor.module.css";

const BurgerIngredients = ({ categories }) => {
  const [isSent, setSent] = useState(false);
  const items = [...categories["sauce"], ...categories["main"]];

  const closeHandler = useCallback((e) => {
    setSent(false);
  }, []);

  const checkoutOrderHandler = useCallback(() => {
    setSent(true);
  });

  return (
    <>
      <IngredientsList items={items} />
      <div className={`${style.footer} mt-10 mb-10 pr-4`}>
        <p className={`text text_type_digits-medium ${style.price} mr-10`}>
          610 &nbsp; <CurrencyIcon type="primary" />
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

BurgerIngredients.propTypes = {
  categories: menuItemsCategories,
};

export default BurgerIngredients;

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

const CHECKOUT_ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
  const [checkoutResponse, setCheckoutResponse] = useState({ data: null, error: null });
  const { constructorState, constructorDispatcher } = useContext(SelectedIngredientsContext);

  const closeHandler = useCallback((e) => {
    setCheckoutResponse({ data: null, error: null });
    constructorDispatcher({ type: 'random' });
  }, []);

  const closeErrorHandler = useCallback((e) => {
    setCheckoutResponse({ data: null, error: null });
  }, []);

  const checkoutOrderHandler = useCallback(() => {

    const requestBody = JSON.stringify({
      ingredients: constructorState.burgerSet,
    });

    console.log('requestBody: ', requestBody);

    fetch(CHECKOUT_ORDER_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "cors",
      body: requestBody,
    }).then(async (result) => {
      if (!result.ok) {
        const resultText = await result.text();
        throw new Error(
          `http status ${result.status} ${result.statusText} ${resultText}`
        );
      }
      const resultJson = await result.json();
      setCheckoutResponse({ error: null, data: resultJson });
    }).catch((error) => {
      setCheckoutResponse({ data: null, error: error.toString() });
    });
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
      {checkoutResponse?.data?.success && (
        <Modal title={checkoutResponse?.data?.name} closeHandler={closeHandler}>
          <OrderDetails
            orderNumber={checkoutResponse?.data?.order?.number}
            thingName={checkoutResponse?.data?.name}
          />
        </Modal>
      )}
      {(checkoutResponse?.data && !checkoutResponse?.data?.success)
        || checkoutResponse?.error && (
          <Modal title="Ошибка" closeHandler={closeErrorHandler}>
            {JSON.stringify(checkoutResponse?.error)}
          </Modal>
        )}
    </>
  );
};

BurgerConstructor.propTypes = {
  categories: menuItemsCategories,
};

export default BurgerConstructor;

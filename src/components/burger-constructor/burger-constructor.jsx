import { useCallback, useState, useContext } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SelectedIngredientsContext } from "../../services/ingredientsContext";
import { checkoutOrder } from "../../utils/requests";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import IngredientsList from "./ingridients-list/ingridients-list";
import style from "./burger-constructor.module.css";
import logo from "../../logo.svg";

function BurgerConstructor() {
  const [isLoading, setLoading] = useState(false);
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
    checkoutOrder(constructorState.burgerSet, responseBody => {
      setCheckoutResponse({ error: null, data: responseBody });
    }, error => {
      setCheckoutResponse({ data: null, error: error.toString() });
    }, setLoading);
  })

  return (
    <>
      <IngredientsList items={constructorState.ingredients} />
      <div className={`${style.footer} mt-10 mb-10 pr-4`}>
        <p className={`text text_type_digits-medium ${style.price} mr-10`}>
          {constructorState.cast} &nbsp; <CurrencyIcon type="primary" />
        </p>
        <CheckoutButton {...{ isLoading, checkoutOrderHandler }} />
      </div>
      {checkoutResponse?.data?.success && (
        <Modal title='' closeHandler={closeHandler}>
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

function CheckoutButton({ isLoading, checkoutOrderHandler }) {
  return (
    <>
      {isLoading
        ? <img src={logo} className={style.spinner} alt="spinner" />
        : <Button
          onClick={checkoutOrderHandler}
          htmlType="button"
          type="primary"
          size="large"
        >Оформить заказ</Button>}
    </>
  );
}

export default BurgerConstructor;

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { sendOrder } from "../../../services/actions/order";
import { SET_ORDER_STATE } from "../../../services/actions/order";
import { makeRandomBurger } from "../../../services/actions/constructor";
import style from "./checkout-panel.module.css";
import { CheckoutButton } from "./checkout-button/checkout-button";

export function CheckoutPanel() {
    const dispatch = useDispatch();

    const { bun, burgerSet, ingredients, checkoutResponse, isLoading } = useSelector(store => ({
        constructor: store.constructor,
        bun: store.constructor.bun,
        burgerSet: store.constructor.burgerSet,
        ingredients: store.ingredients.items,
        checkoutResponse: store.order.result,
        isLoading: store.order.isWait,
    }));


    const checkoutOrderHandler = useCallback(() => {
        dispatch(sendOrder(burgerSet));
    });

    const cast = useMemo(() => { // Подсчет стоимости сэта
        let cast = 0;

        if (!burgerSet) {
            return 0;
        }

        const bunItem = ingredients.find(ingredient => ingredient._id == bun);

        cast += [...burgerSet, bunItem, bunItem].reduce((memo, item) => { // + две булки
            //const item = ingredients.find(ingredient => ingredient._id == itemId);
            memo += item.price;
            return memo;
        }, 0);

        return cast;
    }, [burgerSet]);

    const closeHandler = useCallback((event) => {
        dispatch({ type: SET_ORDER_STATE, payload: { data: null, error: null } });
        dispatch(makeRandomBurger(ingredients));
    }, []);

    const closeErrorHandler = useCallback((event) => {
        dispatch({ type: SET_ORDER_STATE, payload: { data: null, error: null } });
    }, []);

    return (<>
        <div className={`${style.footer} mt-10 mb-10 pr-4`}>
            <p className={`text text_type_digits-medium ${style.price} mr-10`}>
                {cast} &nbsp; <CurrencyIcon type="primary" />
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
    </>);
}

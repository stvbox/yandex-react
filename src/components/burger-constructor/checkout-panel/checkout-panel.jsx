import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { sendOrder } from "../../../services/actions/order";
import { SET_ORDER_STATE } from "../../../services/actions/order";
import { RESET_CONSTRUCTOR_STATE } from "../../../services/actions/constructor";
import style from "./checkout-panel.module.css";
import { CheckoutButton } from "./checkout-button/checkout-button";

export function CheckoutPanel() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { bun, burgerSet, ingredients, checkoutResponse, isLoading, userEmail } = useSelector(store => ({
        bun: store.burgerConstructor.bun,
        burgerSet: store.burgerConstructor.burgerSet,
        ingredients: store.ingredients.items,
        checkoutResponse: store.order.result,
        isLoading: store.order.isWait,
        userEmail: store.burgerAuth.email,
    }));

    const cast = useMemo(() => { // Подсчет стоимости сэта
        let cast = 0;

        if (!burgerSet) {
            return 0;
        }

        const bunItem = ingredients.find(ingredient => ingredient._id == bun);
        const buns = (bunItem ? [bunItem, bunItem] : []);

        cast += [...burgerSet, ...buns].reduce((memo, item) => { // + две булки
            //const item = ingredients.find(ingredient => ingredient._id == itemId);
            memo += item.price;
            return memo;
        }, 0);

        return cast;
    }, [burgerSet, bun]);

    const checkoutOrderHandler = useCallback(() => {
        if (userEmail) {
            dispatch(sendOrder(burgerSet));
            return;
        }

        navigate('/login', { state: { goBack: true } });
    });

    const closeHandler = useCallback((event) => {
        dispatch({ type: SET_ORDER_STATE, payload: { data: null, error: null } });
        dispatch({ type: RESET_CONSTRUCTOR_STATE });
    }, []);

    const closeErrorHandler = useCallback((event) => {
        dispatch({ type: SET_ORDER_STATE, payload: { data: null, error: null } });
    }, []);

    return (<>
        <div className={`${style.footer} mt-10 mb-10 pr-4`}>
            <p className={`text text_type_digits-medium ${style.price} mr-10`}>
                {cast} &nbsp; <CurrencyIcon type="primary" />
            </p>

            {!!bun && (
                <CheckoutButton {...{ isLoading, checkoutOrderHandler }} />
            )}

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
                    {checkoutResponse?.error.toString()}
                </Modal>
            )}
    </>);
}

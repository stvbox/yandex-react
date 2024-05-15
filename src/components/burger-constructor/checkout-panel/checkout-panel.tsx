import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { CheckoutButton } from "./checkout-button/checkout-button";
import { RootState, useAppDispatch } from "../../..";
import { ConstructorActions, constructorActions } from "../../../services/reducers/constructor";
import { ordersActions } from "../../../services/reducers/orders";
import { OrderActions } from "../../../services/reducers/orders.types";
import { checkoutOrder } from "../../../services/actions/orders";
import style from "./checkout-panel.module.css";


export function CheckoutPanel() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { bun, burgerSet, ingredients, checkoutResponse, isLoading, userEmail } = useSelector((store: RootState) => ({
        bun: store.constructer.bun,
        burgerSet: store.constructer.burgerSet,
        ingredients: store.ingredients.items,
        checkoutResponse: store.orders.result,
        userEmail: store.auth.email,
        isLoading: store.orders.isWait,
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
            const bunItem = ingredients.find(item => item._id == bun);
            if (bunItem) {
                dispatch(checkoutOrder([...burgerSet, bunItem, bunItem]));
            }
            return;
        }

        navigate('/login', { state: { goBack: true } });
    }, [burgerSet]);

    const closeHandler = useCallback(() => {
        dispatch(ordersActions[OrderActions.RESET_ORDER_STATE]());
        dispatch(constructorActions[ConstructorActions.RESET_CONSTRUCTOR_STATE]());

        // dispatch({ type: OrderActions.RESET_ORDER_STATE });
        // dispatch({ type: ConstructorActions.RESET_CONSTRUCTOR_STATE });
        // dispatch({ type: OrderActions.SET_ORDER_STATE, payload: { data: null, error: null } });
    }, []);

    const closeErrorHandler = useCallback(() => {
        dispatch(ordersActions[OrderActions.RESET_ORDER_STATE]());
        //dispatch({ type: OrderActions.RESET_ORDER_STATE });
        //dispatch({ type: OrderActions.SET_ORDER_STATE, payload: { data: null, error: null } });
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

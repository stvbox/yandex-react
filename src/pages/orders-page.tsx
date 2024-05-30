import { FC, useEffect } from "react";
import { OrdersList, OrdersListMode } from "../components/orders-list/orders-list";
import style from './orders-page.module.css';
import { RootState, useAppDispatch } from "..";
import { OrderActions } from "../services/reducers/orders.types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const INVALID_TOKEN = "Invalid or missing token";

interface ICompParams {

}

export const OrdersPage: FC<ICompParams> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { orders, ingredients, wsOrdersError } = useSelector((store: RootState) => ({
        ingredients: store.ingredients.items,
        orders: store.orders.orders,
        wsOrdersError: store.orders.wsOrdersError,
    }));

    useEffect(() => {
        dispatch({ type: OrderActions.WS_ORDERS_START });
        return () => {
            dispatch({ type: OrderActions.WS_ORDERS_CLOSED });
        };
    }, []);

    // useEffect(() => {
    //     if (wsOrdersError == INVALID_TOKEN) {
    //         navigate('/login');
    //     }
    // });

    return (<>
        <div className={`${style['orders-wrapper']}`} >
            <div className={`${style['orders-wrapper-content']}`} >
                <OrdersList orders={orders} ingredients={ingredients} error={wsOrdersError} mode={OrdersListMode.Orders} />
            </div>
            <div className={`${style['orders-wrapper-content-footer']}`}>
                &nbsp;
            </div>
        </div>
    </>);
}
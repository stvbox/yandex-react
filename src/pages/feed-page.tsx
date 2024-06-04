import { FC, useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "..";
import { IMenuItem } from "../utils/data.type";
import { OrdersDashboard } from "../components/orders-dashboard/orders-dashboard";
import { OrdersList, OrdersListMode } from "../components/orders-list/orders-list";
import { OrderActions } from "../services/reducers/orders.types";
import style from "./feed-page.module.css";


interface ICompProps {

}

type IIngredientsById = { [index: string]: IMenuItem };

type IIngredientsCounters = { [index: string]: number };
type IOrderCounters = { [index: string]: IIngredientsCounters };

type IOrderTotals = { [index: string]: number };

export const FeedPage: FC<ICompProps> = () => {
    const dispatch = useAppDispatch();

    const { orders, ingredients, wsFeedError } = useAppSelector((store: RootState) => ({
        ingredients: store.ingredients.items,
        orders: store.orders.feed,
        wsFeedError: store.orders.wsFeedError,
    }));

    useEffect(() => {
        dispatch({ type: OrderActions.WS_FEED_START });
        return () => {
            dispatch({ type: OrderActions.WS_FEED_CLOSED });
        };
    }, []);

    return (<main>
        <section className={`${style['section-wrapper-left']} mr-15`}>
            <p className={`${style['orders-wrapper-title']} text text_type_main-large pb-5`}>
                Лента заказов
            </p>
            <OrdersList orders={orders}
                ingredients={ingredients}
                error={wsFeedError}
                mode={OrdersListMode.Feed}
            />
        </section>
        <section className={`${style['section-wrapper-right']}`}>
            <OrdersDashboard />
            {/* {JSON.stringify(ingredientsById)}
            {JSON.stringify(ingredients)} */}
        </section>
    </main>);
}
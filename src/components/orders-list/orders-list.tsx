import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { IMenuItem } from "../../utils/data.type";
import { OrderStatus } from "./order-status/order-status";
import style from "./orders-list.module.css";
import { OrdersItem } from "../../services/reducers/orders.types";


export enum OrdersListMode {
    Feed = 'feed',
    Orders = 'orders'
}

interface ICompProps {
    orders: OrdersItem[];
    ingredients: IMenuItem[];
    mode: OrdersListMode;
    error: string;
}

type IIngredientsById = { [index: string]: IMenuItem };

type IIngredientsCounters = { [index: string]: number };
type IOrderCounters = { [index: string]: IIngredientsCounters };

type IOrderTotals = { [index: string]: number };


export const OrdersList: FC<ICompProps> = ({ mode, error, ingredients, orders }) => {
    const navigate = useNavigate();

    const ingredientsById: IIngredientsById = ingredients.reduce((memo, item) => {
        memo[item._id] = item;
        return memo;
    }, {} as IIngredientsById);

    const ingredientsCounters: IOrderCounters = orders.reduce((memo, order) => {
        if (!memo[order._id]) {
            memo[order._id] = {};
        }
        order.ingredients.forEach(ingredient => {
            if (!memo[order._id][ingredient]) {
                memo[order._id][ingredient] = 0;
            }
            memo[order._id][ingredient]++;
        });
        return memo;
    }, {} as IOrderCounters);

    const ordersTotal = Object.keys(ingredientsCounters).reduce((memo, orderId) => {
        memo[orderId] = Object.keys(ingredientsCounters[orderId]).reduce((total, ingredientId) => {
            return total + ingredientsById[ingredientId].price * ingredientsCounters[orderId][ingredientId];
        }, 0);
        return memo;
    }, {} as IOrderTotals);

    const clickOrder = (order: OrdersItem) => {
        console.log('order: ', order);
        navigate(String(order.number), {
            state: { background: true, orderNumber: order.number },
        });
    };

    return orders.length ? (<div className={`${style['component-wrapper']}`}>

        {error && error}

        {orders.length && (<div className={`${style['orders-items']} scroll-box`} >{
            orders.map((order, index) => {
                const key = mode + order.number + index;
                return (<div key={key} onClick={(e) => { clickOrder(order) }} className={`${style["feed-item"]} pl-6 pr-6 pt-6 pb-6 mb-4`} >
                    <div className={`${style['number-date-row']}`} >
                        <p className={`${style['number-block']} text text_type_digits-default`}>
                            #{order.number}
                        </p>
                        <p className={`${style['time-block']} text text_type_main-default ml-2 text_color_inactive`}>
                            {order.createdAtDateTime}
                        </p>
                    </div>
                    <p className="text text_type_main-medium mt-6 mb-2">
                        {order.name}
                    </p>
                    {mode == OrdersListMode.Orders ?
                        (<p className="text text_type_main-default mb-2" key={order.status}>
                            <OrderStatus statusCode={order.status} />
                        </p>) : <></>}
                    <div className={`${style['order-sum-row']} mt-4`} key={order._id}>
                        <div className={`${style['ingredients-block']}`} >
                            {Object.keys(ingredientsCounters[order._id]).map(ingredientId => {
                                return (<div key={ingredientId} className={`${style['ingredients-block-item-wrapper']}`} >
                                    <div className={`${style['ingredients-block-item-border']}`} >
                                        <div className={`${style['ingredients-block-item']}`} >
                                            <img src={ingredientsById[ingredientId]['image_mobile']} alt={ingredientsById[ingredientId]['name']} />
                                            {ingredientsCounters[order._id][ingredientId] > 1 ?
                                                (<div className={`${style['ingredients-block-item-count']} text text_type_main-default`} >
                                                    +{ingredientsCounters[order._id][ingredientId]}
                                                </div>) : (<></>)
                                            }
                                        </div>
                                    </div>
                                </div>);
                            })}
                        </div>
                        <div className={`${style['order-sum-value']}`} >
                            <p className="text text_type_digits-default">{ordersTotal[order._id]}</p>
                            &nbsp; <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>)
            })
        }</div>)}
    </div>) : <></>;
};
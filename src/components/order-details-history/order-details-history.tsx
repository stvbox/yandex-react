import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState, useAppDispatch } from "../..";
import { IMenuItem } from "../../utils/data.type";
import { OrderStatus } from "../orders-list/order-status/order-status";
import style from "./order-details-history.module.css";
import { fetchOrder } from "../../services/actions/orders";


type IIngredientsById = { [index: string]: IMenuItem };
type IIngredientsCounters = { [index: string]: number };

interface ICompParams {
    orderNumber: string;
    isModal: boolean;
}

export const OrderDetailsHistory: FC<ICompParams> = ({ orderNumber, isModal }) => {
    const dispatch = useAppDispatch();

    const { orders, ingredients, feed } = useSelector((store: RootState) => ({
        ingredients: store.ingredients.items,
        orders: store.orders.orders,
        feed: store.orders.feed,
    }));

    const order = [...orders, ...feed].find(_order => _order.number == orderNumber);

    const ingredientsById: IIngredientsById = ingredients.reduce((memo, item) => {
        memo[item._id] = item;
        return memo;
    }, {} as IIngredientsById);

    let counters: IIngredientsCounters = {};
    if (order) {
        counters = order.ingredients.reduce((memo, ingredient) => {
            if (!memo[ingredient]) {
                memo[ingredient] = 0;
            }
            memo[ingredient]++;
            return memo;
        }, {} as IIngredientsCounters);
    }

    const totalSumm = Object.keys(counters).reduce((memo, ingredientId) => {
        return memo + counters[ingredientId] * ingredientsById[ingredientId].price;
    }, 0);

    useEffect(() => {
        dispatch(fetchOrder(orderNumber));
    }, [orderNumber]);

    return (<div className={`${style['order-detail-wrapper']}`}>
        {!isModal ? (<p className={`${style['number-block']} text text_type_digits-default mb-6`}>
            #{order?.number}
        </p>) : <div className="mt-3" ></div>}
        <p className="text text_type_main-medium mb-3">
            {order?.name}
        </p>
        <p className={`${style['status-block']} text text_type_main-default ${!isModal ? 'mb-15' : ''}`}>
            <OrderStatus statusCode={order?.status} />
        </p>
        <p className={`text text_type_main-medium mb-6`}>
            Состав: {orderNumber}
        </p>
        <div className={`${style['ingredients-wrapper']} scroll-box pr-6`}>
            {counters && Object.keys(counters).map((ingredientId: string) => {
                return (<div className={`${style['ingredient-wrapper']} mb-4`} key={ingredientId} >
                    <div className={`${style['ingredient-icon-border']} mr-4`}>
                        <div className={`${style['ingredient-icon-wrapper']}`}>
                            <img src={ingredientsById[ingredientId].image_mobile} alt={ingredientsById[ingredientId].name} />
                        </div>
                    </div>
                    <div className={`${style['ingredient-name-wrapper']} mr-4`}>
                        <p className="text text_type_main-default">
                            {ingredientsById[ingredientId].name}
                        </p>
                    </div>
                    <div className={`${style['ingredient-total-wrapper']}`}>
                        <p className="text text_type_digits-default">
                            {counters[ingredientId]} x {ingredientsById[ingredientId].price}
                        </p>
                    </div>
                </div>);
            })}
        </div>
        <div className={`${style['total-wrapper']} mt-6`}>
            <p className={`${style['time-block']} text text_type_main-default ml-2 text_color_inactive`}>
                {order?.createdAtDateTime}
            </p>
            <div className={`${style['summ-wrapper']}`}>
                <p className="text text_type_digits-default">{totalSumm}</p>
                &nbsp; <CurrencyIcon type="primary" />
            </div>
        </div>
        {!isModal ? (<div className={`${style['bbottom-pusher']} mt-6`} />) : <></>}
    </div>);
}
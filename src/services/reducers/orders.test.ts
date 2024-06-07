import { checkoutOrder, fetchOrder } from "../actions/orders";
import { ordersActions, ordersReducer } from "./orders";
import { ICheckoutResult, IOrdersState, OrderActions, OrdersItem, OrdersMessageWS, OrdersStatuses } from "./orders.types";


const initialState: IOrdersState = {
    wsFeedError: "",
    wsOrdersError: "",
    feed: [],
    orders: [],
    total: 0,
    totalToday: 0,
    result: {
        data: null,
        error: null,
    },
    isWait: false,
}

const checoutResult: ICheckoutResult = {
    success: false,
    name: "",
    order: {
        ingredients: [],
        _id: "",
        owner: {
            name: "",
            email: "",
            createdAt: "",
            updatedAt: ""
        },
        status: "done",
        name: "",
        createdAt: "",
        updatedAt: "",
        number: 0,
        price: 0
    }
};

const ORDER_ITEM: OrdersItem = {
    _id: "",
    ingredients: [],
    status: OrdersStatuses.Pending,
    name: "",
    createdAt: "",
    updatedAt: "",
    number: "",
    createdAtDateTime: "",
    updatedAtDateTime: ""
}

describe("ordersSlice", () => {
    it('Сброс информации о заказе', () => {
        const mockState: IOrdersState = {
            ...initialState,
            result: {
                data: checoutResult,
                error: 'xxx'
            },
        };

        const action = ordersActions[OrderActions.RESET_ORDER_STATE]();
        const state = ordersReducer(mockState, action);

        expect(state.result.data).toBeNull();
        expect(state.result.error).toBeNull();
    });

    it('Сообщение WS ленты', () => {
        const message: OrdersMessageWS = {
            orders: [ORDER_ITEM],
            totalToday: 1,
            total: 1,
            success: false,
            message: ""
        };
        const action = ordersActions[OrderActions.WS_FEED_MESSAGE](message);
        const state = ordersReducer(initialState, action);

        expect(state.feed.length).toBe(1);
        expect(state.totalToday).toBe(1);
        expect(state.total).toBe(1);
    });

    it('Сообщение WS заказов', () => {
        const message: OrdersMessageWS = {
            orders: [ORDER_ITEM],
            totalToday: 1,
            total: 1,
            success: false,
            message: ""
        };
        const action = ordersActions[OrderActions.WS_ORDERS_MESSAGE](message);
        const state = ordersReducer(initialState, action);

        expect(state.orders.length).toBe(1);
    });

    it('Получение заказа', () => {
        const fulFillaction = {
            type: fetchOrder.fulfilled.type,
            payload: {
                json: {
                    orders: [ORDER_ITEM]
                }
            }
        };
        const state = ordersReducer(initialState, fulFillaction);

        expect(state.feed.length).toBe(1);
    });

    it('Изменение состояния при оформлении заказа', () => {
        const checkoutResult: ICheckoutResult = {
            success: false,
            name: "",
            order: {
                ingredients: [],
                _id: "",
                owner: {
                    name: "",
                    email: "",
                    createdAt: "",
                    updatedAt: ""
                },
                status: "done",
                name: "",
                createdAt: "",
                updatedAt: "",
                number: 0,
                price: 0
            }
        };

        const fulFillaction = {
            type: checkoutOrder.fulfilled.type,
            payload: {
                json: checkoutResult,
            }
        };
        const state = ordersReducer(initialState, fulFillaction);

        expect(state.result.data).toBeTruthy();
    }); 

});
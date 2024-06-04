import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrdersState, OrderActions, OrdersMessageWS } from "./orders.types";
import { checkoutOrder, fetchOrder } from "../actions/orders";


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

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        [OrderActions.RESET_ORDER_STATE]: (state, action: PayloadAction) => {
            state.result = { data: null, error: null };
        },

        [OrderActions.WS_FEED_ERROR]: (state, action: PayloadAction<string>) => {
            console.log('<< action.payload(WS_FEED_ERROR)', action.payload);
            state.wsFeedError = action.payload;
        },
        [OrderActions.WS_ORDERS_ERROR]: (state, action: PayloadAction<string>) => {
            console.log('<< action.payload(WS_ORDERS_ERROR)', action.payload);
            state.wsOrdersError = action.payload;
        },

        [OrderActions.WS_FEED_SUCCESS]: (state, action: PayloadAction<OrdersMessageWS>) => {
            console.log('<< action.payload(WS_FEED_SUCCESS)', action.payload);
            console.log(action);
        },
        [OrderActions.WS_ORDERS_SUCCESS]: (state, action: PayloadAction<OrdersMessageWS>) => {
            console.log('<< action.payload(WS_ORDERS_SUCCESS)', action.payload);
            console.log(action);
        },
        [OrderActions.WS_FEED_MESSAGE]: (state, action: PayloadAction<OrdersMessageWS>) => {
            console.log('<< action.payload(FEED)', action.payload);
            state.feed = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        [OrderActions.WS_ORDERS_MESSAGE]: (state, action: PayloadAction<OrdersMessageWS>) => {
            console.log('<< action.payload(ORDERS)', action.payload);
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
    },
    extraReducers(builder) {

        // fetchOrder
        builder.addCase(fetchOrder.pending, (state, action) => {
            console.log('fetchOrder.pending: ', action);
            // state.result.data = action.payload.json;
            // state.result.error = null;
            // state.isWait = false;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            console.log('fetchOrder.fulfilled: ', action);
            console.log('fetchOrder.fulfilled: ', action.payload.json.orders[0]);

            const finded = state.feed.find(order => order._id == action.payload.json.orders[0]._id);
            if (!finded) {
                state.feed = [...state.feed, action.payload.json.orders[0]];
            }
        });
        builder.addCase(fetchOrder.rejected, (state, action) => {
            console.log('fetchOrder.rejected: ', action);
            // state.result.data = action.payload.json;
            // state.result.error = null;
            // state.isWait = false;
        });

        // checkoutOrder
        builder.addCase(checkoutOrder.pending, (state, action) => {
            console.log('checkoutOrder.pending: ', action);
            state.isWait = true;
        });
        builder.addCase(checkoutOrder.rejected, (state, action) => {
            console.log('checkoutOrder.rejected: ', action);
            state.result.data = null;
            state.result.error = String(action.error);
            state.isWait = false;
        });
        builder.addCase(checkoutOrder.fulfilled, (state, action) => {
            console.log('checkoutOrder.fulfilled: ', action);
            state.result.data = action.payload.json;
            state.result.error = null;
            state.isWait = false;
        });

    }
});

export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;

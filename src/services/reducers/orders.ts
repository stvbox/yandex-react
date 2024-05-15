import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrdersState, OrderActions } from "./orders.types";
import { checkoutOrder } from "../actions/orders";


const initialState: IOrdersState = {
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
    },
    extraReducers(builder) {

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

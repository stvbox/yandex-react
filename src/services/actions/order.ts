import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { IMenuItem } from "../../utils/data.type";
import { fetchWithRefresh } from "../../utils/token";
import { ICheckoutResult } from "../reducers/orders.types";
import { getHeaders } from "../../utils/requests";


const CHECKOUT_ORDER_URL = BASE_URL + '/orders';

export const checkoutOrder = createAsyncThunk('order/checkout', (ingredients: IMenuItem[]) => {
    console.log('checkoutOrder');
    const requestBody = JSON.stringify({ ingredients });
    return fetchWithRefresh<ICheckoutResult>(CHECKOUT_ORDER_URL, {
        method: "POST",
        headers: getHeaders(),
        mode: "cors",
        body: requestBody,
    });
});
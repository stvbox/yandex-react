import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { IMenuItem } from "../../utils/data.type";
import { fetchWithRefresh } from "../../utils/token";
import { ICheckoutResult, OrdersItem } from "../reducers/orders.types";
import { getHeaders } from "../../utils/requests";


const CHECKOUT_ORDER_URL = BASE_URL + '/orders';
const FETCH_ORDER_URL: string = BASE_URL + '/orders/{номер заказа}?token=${accessToken}';

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

interface IFetchOrder {
    orders: OrdersItem[];
    success: boolean;
    message: string;
}

export const fetchOrder = createAsyncThunk('order/fetch', (orderNumber: string) => {
    const url = FETCH_ORDER_URL.replace('{номер заказа}', orderNumber);

    console.log('123123');

    return fetchWithRefresh<IFetchOrder>(url, {
        method: "GET",
        headers: getHeaders(),
        mode: "cors",
    });
});

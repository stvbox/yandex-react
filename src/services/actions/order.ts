import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { IMenuItem } from "../../utils/data.type";
import { fetchWithRefresh } from "../../utils/token";
import { ICheckoutResult } from "../reducers/orders.types";
import { getHeaders } from "../../utils/requests";
import { ordersActions } from "../reducers/orders";


const CHECKOUT_ORDER_URL: string = BASE_URL + '/orders';

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

// export const startOrdersSocket = (wsUrl: string): Middleware => {
//     return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//         let socket: WebSocket | null = null;

//         return next => (action: PayloadAction) => {
//             const { dispatch, getState } = store;
//             const { type, payload } = action;

//             if (type === 'WS_CONNECTION_START') { // Запуск сокета
//                 socket = new WebSocket(wsUrl);
//             }

//             if (socket) {

//                 // функция, которая вызывается при открытии сокета
//                 socket.onopen = event => {
//                     dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
//                 };

//                 // функция, которая вызывается при ошибке соединения
//                 socket.onerror = event => {
//                     dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
//                 };

//                 // функция, которая вызывается при получения события от сервера
//                 socket.onmessage = event => {
//                     const { data } = event;
//                     dispatch({ type: 'WS_GET_MESSAGE', payload: data });
//                 };
//                 // функция, которая вызывается при закрытии соединения
//                 socket.onclose = event => {
//                     dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
//                 };

//                 if (type === 'WS_SEND_MESSAGE') {
//                     const message = payload;
//                     // функция для отправки сообщения на сервер
//                     socket.send(JSON.stringify(message));
//                 }
//             }

//             next(action);
//         };
//     }) as Middleware;
// };
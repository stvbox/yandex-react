// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';
import { OrderActions, OrdersMessageWS } from './reducers/orders.types';
import { ordersActions } from './reducers/orders';
import moment from 'moment';
import { _refreshToken, getAccessToken } from '../utils/token';


//export const HUMAN_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";

//import type { AppActions, AppDispatch, RootState } from '../types';

// "Invalid or missing token"

export interface IOrdersSocketActions {
    WS_CONNECTION_START: OrderActions.WS_FEED_START | OrderActions.WS_ORDERS_START;
    WS_CONNECTION_CLOSE: OrderActions;
    WS_CONNECTION_SUCCESS: OrderActions;
    WS_CONNECTION_ERROR: OrderActions.WS_FEED_ERROR | OrderActions.WS_ORDERS_ERROR;
    WS_GET_MESSAGE: OrderActions.WS_FEED_MESSAGE | OrderActions.WS_ORDERS_MESSAGE;
    WS_SEND_MESSAGE: OrderActions;
}

const sockets: { [index: string]: WebSocket } = {};

export const socketMiddleware = (_wsUrl: string, actions: IOrdersSocketActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        return next => (action: PayloadAction) => {

            let wsUrl = _wsUrl.replace('${accessToken}', getAccessToken())
                .replace('Bearer ', '');

            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === actions.WS_CONNECTION_START) {
                if (!sockets[wsUrl] || sockets[wsUrl].readyState == WebSocket.CLOSING
                    || sockets[wsUrl].readyState == WebSocket.CLOSED) {
                    try {
                        sockets[wsUrl] = new WebSocket(wsUrl);
                    } catch (error) {
                        dispatch({ type: actions.WS_CONNECTION_ERROR, payload: error });
                    }
                }
            }

            if (type == actions.WS_CONNECTION_CLOSE && sockets[wsUrl]) {
                if (sockets[wsUrl].readyState != WebSocket.CLOSING
                    && sockets[wsUrl].readyState != WebSocket.CLOSED) {
                    sockets[wsUrl].close();
                }
            }

            if (sockets[wsUrl] && sockets[wsUrl].readyState != WebSocket.CLOSING
                && sockets[wsUrl].readyState != WebSocket.CLOSED) {

                // функция, которая вызывается при открытии сокета
                sockets[wsUrl].onopen = (event: Event) => {
                    console.log('sockets[wsUrl].onopen', event);
                    dispatch({ type: actions.WS_CONNECTION_SUCCESS, payload: true });
                };

                // функция, которая вызывается при ошибке соединения
                sockets[wsUrl].onerror = (event: Event) => {
                    console.log('sockets[wsUrl].onerror', event);
                    dispatch({ type: actions.WS_CONNECTION_ERROR, payload: true });
                };

                // функция, которая вызывается при получения события от сервера
                sockets[wsUrl].onmessage = (event: MessageEvent<string>) => {
                    const data: OrdersMessageWS = JSON.parse(event.data);

                    console.log('sockets[wsUrl].onmessage', data);

                    if (!data.success) {

                        _refreshToken().then(result => {
                            wsUrl = _wsUrl.replace(getAccessToken(), getAccessToken());
                            dispatch({ type: OrderActions.WS_ORDERS_START });
                        });

                        dispatch(ordersActions[actions.WS_CONNECTION_ERROR](data.message));
                        return;
                    } else {
                        data.orders.forEach((order, index) => {
                            order.createdAtDateTime = toBurgerDate(order.createdAt);
                            order.updatedAtDateTime = toBurgerDate(order.updatedAt);
                        });

                        dispatch(ordersActions[actions.WS_GET_MESSAGE](data));
                    }
                };

                if (type === actions.WS_SEND_MESSAGE) {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    sockets[wsUrl].send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};

// export const orderWSMiddleware = (wsUrl: string): Middleware => {
//     return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//         let socket: WebSocket | null = null;

//         return next => (action: PayloadAction) => {
//             const { dispatch, getState } = store;
//             const { type, payload } = action;

//             if (type === OrderActions.WS_ORDERS_START) {
//                 socket = new WebSocket(wsUrl);
//             }

//             if (socket) {

//                 // функция, которая вызывается при открытии сокета
//                 socket.onopen = event => {
//                     dispatch({ type: OrderActions.WS_ORDERS_SUCCESS, payload: event });
//                 };

//                 // функция, которая вызывается при ошибке соединения
//                 socket.onerror = event => {
//                     dispatch({ type: OrderActions.WS_ORDERS_ERROR, payload: event });
//                 };

//                 // функция, которая вызывается при получения события от сервера
//                 socket.onmessage = event => {
//                     const data = JSON.parse(event.data) as OrdersMessageWS;

//                     data.orders.forEach((order, index) => {
//                         order.createdAtDateTime = toBurgerDate(order.createdAt);
//                         order.updatedAtDateTime = toBurgerDate(order.updatedAt);
//                     });

//                     dispatch(ordersActions[OrderActions.WS_ORDERS_MESSAGE](data));
//                 };

//                 // функция, которая вызывается при закрытии соединения
//                 socket.onclose = event => {
//                     dispatch({ type: OrderActions.WS_ORDERS_CLOSED, payload: event });
//                 };

//                 if (type === OrderActions.WS_ORDERS_SEND_MESSAGE) {
//                     const message = payload;
//                     // функция для отправки сообщения на сервер
//                     socket.send(JSON.stringify(message));
//                 }
//             }

//             next(action);
//         };
//     }) as Middleware;
// };

function toBurgerDate(stringDate: string): string {
    const date: Date = new Date(stringDate);

    const daysDiff = Math.floor((Date.now() / 1000) / 86400)
        - Math.floor((date.getTime() / 1000) / 86400);

    let daysPhrase = '';
    if (daysDiff == 0) {
        daysPhrase = 'Сегодня';
    } else if (daysDiff == 1) {
        daysPhrase = 'Вчера';
    } else if (lastDigital(daysDiff) == 1) {
        daysPhrase = daysDiff + ' день назад';
    } else if (lastDigital(daysDiff) > 1 && lastDigital(daysDiff) < 5) {
        daysPhrase = daysDiff + ' дня назад';
    } else if ((lastDigital(daysDiff) > 4 && lastDigital(daysDiff) < 10) || lastDigital(daysDiff) == 0) {
        daysPhrase = daysDiff + ' дней назад';
    }

    const time: string = moment(date).format("HH:mm");

    return `${daysPhrase}, ${time}`;
}
function lastDigital(numb: number): number {
    const numberString = String(numb);
    return Number.parseInt(numberString[numberString.length - 1]);
}


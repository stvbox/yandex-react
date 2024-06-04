import { IMenuItem } from "../../utils/data.type";


export enum OrderActions {
    RESET_ORDER_STATE = "SET_ORDER_STATE",

    WS_ORDERS_START = "WS_ORDERS_START",
    WS_ORDERS_MESSAGE = "WS_ORDERS_MESSAGE",
    WS_ORDERS_CLOSED = "WS_ORDERS_CLOSED",
    WS_ORDERS_SUCCESS = "WS_ORDERS_SUCCESS",
    WS_ORDERS_ERROR = "WS_ORDERS_ERROR",
    WS_ORDERS_SEND_MESSAGE = "WS_ORDERS_SEND_MESSAGE",

    WS_FEED_START = "WS_FEED_START",
    WS_FEED_MESSAGE = "WS_FEED_MESSAGE",
    WS_FEED_CLOSED = "WS_FEED_CLOSED",
    WS_FEED_SUCCESS = "WS_FEED_SUCCESS",
    WS_FEED_ERROR = "WS_FEED_ERROR",
    WS_FEED_SEND_MESSAGE = "WS_FEED_SEND_MESSAGE",
}

export enum OrdersStatuses {
    Pending = 'pending',
    Done = 'done',
}

export interface OrdersItem {
    _id: string;
    ingredients: string[];
    status: OrdersStatuses;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: string;
    createdAtDateTime: string;
    updatedAtDateTime: string;
}

export interface OrdersMessageWS {
    orders: OrdersItem[];
    totalToday: number;
    total: number;
    success: boolean,
    message: string,
}

export interface IOrdersState {
    wsFeedError: string;
    wsOrdersError: string;
    feed: OrdersItem[];
    orders: OrdersItem[];
    total: number;
    totalToday: number;
    result: {
        data: ICheckoutResult | null;
        error: string | null;
    };
    isWait: boolean;
}

export interface ICheckoutResult {
    "success": boolean;
    "name": string;
    "order": {
        "ingredients": IMenuItem[];
        "_id": string;
        "owner": {
            "name": string,
            "email": string;
            "createdAt": string;
            "updatedAt": string;
        };
        "status": 'done' | 'недон';
        "name": string;
        "createdAt": string;
        "updatedAt": string;
        "number": number;
        "price": number;
    }
}

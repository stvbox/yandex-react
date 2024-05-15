import { IMenuItem } from "../../utils/data.type";


export enum OrderActions {
    RESET_ORDER_STATE = "SET_ORDER_STATE",
}

export interface IOrdersState {
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

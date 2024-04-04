import { checkoutOrder } from "../../utils/requests";

export const SET_ORDER_WAIT = "SET_ORDER_WAIT";
export const SET_ORDER_STATE = "SET_ORDER_STATE";

export const sendOrder = (ingredients) => {
    return function (dispatch) {
        dispatch({ type: SET_ORDER_WAIT, payload: true });

        checkoutOrder(ingredients, (response) => {
            // console.log('response: ', response);
            dispatch({ type: SET_ORDER_STATE, payload: { data: response, error: null } });
        }, (error) => {
            // console.log('error: ', error);
            dispatch({ type: SET_ORDER_STATE, payload: { data: null, error: error } });
        }, (isBusy) => {
            dispatch({ type: SET_ORDER_WAIT, payload: isBusy });
        });

    }
}
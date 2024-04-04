import {
    SET_ORDER_WAIT,
    SET_ORDER_STATE,
} from "../actions/order";

const orderInitialState = {
    result: { data: null, error: null },
    isWait: false,
}

export const order = (state = orderInitialState, action) => {

    switch (action.type) {
        case SET_ORDER_WAIT:
            return {
                ...state,
                isWait: action.payload,
            };
        case SET_ORDER_STATE:

            //console.log('action.payload: ' + action.payload);

            return {
                ...state,
                result: action.payload,
            };
    }

    return state;
}
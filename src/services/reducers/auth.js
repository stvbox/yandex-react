import { WAIT_USER_INFO, SET_USER_INFO } from "../actions/auth";


const authInitialState = {
    wait: true,
    email: null,
    name: null,
};

export const burgerAuth = (state = authInitialState, action) => {
    switch (action.type) {
        case WAIT_USER_INFO:
            return { ...state, wait: action.payload };
        case SET_USER_INFO:
            const { email, name } = action.payload;
            return { ...state, email, name };
    }

    return state;
};
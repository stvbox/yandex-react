import {
    SET_INGRIDIENTS_ITEMS,
    SET_INGRIDIENTS_CATEGORIES,
    SET_INGRIDIENTS_LOADING,
    SET_INGRIDIENTS_ERROR,
} from "../actions/ingridients";


const initialState = {
    isLoading: false,
    items: [],
    categories: { bun: [], main: [], sauce: [] },
    error: null,
};

export const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGRIDIENTS_ITEMS:
            return {
                ...state,
                items: action.ingridients,
            };
        case SET_INGRIDIENTS_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            };
        case SET_INGRIDIENTS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case SET_INGRIDIENTS_ERROR:
            return {
                ...state,
                error: action.error,
            };
    }
    return state;
};
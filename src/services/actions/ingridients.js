import { getIngredients } from "../../utils/requests";

export const SET_INGRIDIENTS_ITEMS = 'SET_INGRIDIENTS_ITEMS';
export const SET_INGRIDIENTS_CATEGORIES = 'SET_INGRIDIENTS_CATEGORIES';
export const SET_INGRIDIENTS_LOADING = 'SET_INGRIDIENTS_LOADING';
export const SET_INGRIDIENTS_ERROR = 'SET_INGRIDIENTS_ERROR';


export const loadIngridients = () => {

    return function (dispatch) {

        dispatch({ type: SET_INGRIDIENTS_LOADING, isLoading: false });

        getIngredients((responseBody) => {

            const categories = responseBody.data.reduce(
                (memo, item, index) => {
                    memo[item.type] = [...memo[item.type], item];
                    return memo;
                },
                { bun: [], main: [], sauce: [] }
            );
            dispatch({ type: SET_INGRIDIENTS_ITEMS, ingridients: responseBody.data });
            dispatch({ type: SET_INGRIDIENTS_CATEGORIES, categories });
            dispatch({ type: SET_INGRIDIENTS_LOADING, isLoading: false });

            //dispatch(makeRandomBurger(responseBody.data));

            // setIngridients(responseBody.data);
            // setCategories(categories);
        }, (error) => {
            dispatch({ type: SET_INGRIDIENTS_ERROR, error });
            //setError(error);
        });
    }
}
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategories, IMenuItem } from "../../utils/data.type";
import { fetchWithRefresh } from "../../utils/token";
import { getHeaders } from "../../utils/requests";
import { IGetIngridientsResult, IngredientsState, IngridientsActions } from "./ingredients.types";
import { BASE_URL } from "../../utils/constants";


const GET_INGRIDIENTS_URL = BASE_URL + '/ingredients';

export const loadIngridients = createAsyncThunk('ingridients/load', () => {
    return fetchWithRefresh<IGetIngridientsResult>(GET_INGRIDIENTS_URL, {
        method: "GET",
        headers: getHeaders(),
    }).then((response) => {
        console.log('loadIngridients(response):', response);

        if (response.json.success) {
            return response;
        }

        throw response.json.message;

        // if (response.ok) {
        //     const json = response.json;
        //     const textBody = JSON.stringify(json);
        //     const message = `http status ${response.status} ${response.statusText} ${textBody}`;
        //     return { message, json };
        // }
    });
});

const initialState: IngredientsState = {
    isLoading: false,
    items: [],
    categories: { bun: [], main: [], sauce: [] },
    error: null,
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        [IngridientsActions.SET_INGRIDIENTS_ITEMS]: (state, action: PayloadAction<IMenuItem[]>) => {
            state.items = action.payload;
        },
        [IngridientsActions.SET_INGRIDIENTS_CATEGORIES]: (state, action: PayloadAction<ICategories>) => {
            state.categories = action.payload;
        },
        [IngridientsActions.SET_INGRIDIENTS_LOADING]: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        [IngridientsActions.SET_INGRIDIENTS_ERROR]: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {

        // loadIngridients
        builder.addCase(loadIngridients.pending, (state, action) => {
            console.log('loadIngridients.pending:', action);
            state.isLoading = true;
        });
        builder.addCase(loadIngridients.rejected, (state, action) => {
            console.log('loadIngridients.rejected:', action);
            state.isLoading = false;
        });
        builder.addCase(loadIngridients.fulfilled, (state, action) => {
            console.log('loadIngridients.fulfilled:', action);
            state.items = action.payload?.json.data || [];
            state.categories = state.items.reduce((memo, item) => {
                memo[item.type] = [...memo[item.type], item];
                return memo;
            }, { bun: [], main: [], sauce: [] } as ICategories);

            state.isLoading = false;
        });
    },
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;

// export const ingredients = (state = initialState, action: IngridientsAction) => {
//     switch (action.type) {
//         case IngridientsActions.SET_INGRIDIENTS_ITEMS:
//             return {
//                 ...state,
//                 items: action.ingridients,
//             };
//         case IngridientsActions.SET_INGRIDIENTS_CATEGORIES:
//             return {
//                 ...state,
//                 categories: action.categories,
//             };
//         case IngridientsActions.SET_INGRIDIENTS_LOADING:
//             return {
//                 ...state,
//                 isLoading: action.isLoading,
//             };
//         case IngridientsActions.SET_INGRIDIENTS_ERROR:
//             return {
//                 ...state,
//                 error: action.error,
//             };
//     }
//     return state;
// };